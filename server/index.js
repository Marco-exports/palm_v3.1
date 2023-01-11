// START:  nodemon server
process.title = 'SABIANA'
console.log('Node: ' + process.version + ' / PID: ' + process.pid + ' : SABIANA')
console.log(`PLATFORM : ${process.platform}`)
if (process.platform==='linux') {
   const pigpio = require('pigpio')
   pigpio.terminate()
   pigpio.initialize() // pigpio C library initialized here
   console.log('pigpio Hardware: ' + pigpio.hardwareRevision().toString(16))
   pigpio.configureClock(5, pigpio.CLOCK_PWM)   // lowest CPU usage
}
const port = process.env.PORT || 8080
const config_files = require('./config')   // config ROOM --> global X
const http = require("http")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())
const server = http.createServer(app)    // HTTP server
const io = require('socket.io')(server, {pingTimeout: 60000 }) // io server
server.listen(port,() => console.log(` Node on port :  ${port}`))

const { createProxyMiddleware } = require('http-proxy-middleware')
const pigpio = require("pigpio");
module.exports = function(app) {app.use('/', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true }))}

app.use('/', express.static( '../build'))
app.use('/fans', require('./routes/tab_fans').router)    // TAB:  config fan speeds
// app.use('/backlight', require('./routes/backlight').router) // obsolete
app.use('/windows', require('./routes/tab_windows').router)

app.get('/XXXXX', function (req, res) { res.send( ROOM.room_ID )})
app.get('/ROOM_WIN', function (req, res) { res.send( ROOM_WIN )})
app.get('/QRQRQ', function (req, res) {
   res.sendFile(__dirname +'/QR_CODES/QR_'+ ROOM.room_ID +'.png')
   console.log("QRQRQ : " + ROOM.room_ID)}
)

require('./modules/gpioBankRead')(io)
require('./modules/dark_sky')(io)
require('./modules/fan_speed')(io)
require('./modules/temperature')(io)
require('./modules/indoor')(io)
// require('./modules/window')(io)     // send ROOM_WIN
require('./modules/motion_PIR')(io)
require('./modules/one_Wire_DS18B20')(io)
require('./modules/backlight')(io)

console.log(' Memory usage: ')
console.log( process.memoryUsage() )
var IP_address = require('os').networkInterfaces()
console.log(' IP: ' + IP_address.wlan0[0].address )
// console.dir(IP_address, { depth: null })

if(process.platform==='linux') {
   const pigpio = require('pigpio')
   const Gpio = pigpio.Gpio
   const WATER = new Gpio(12, {mode: Gpio.OUTPUT})    // alt = 13 / 12
   const SABIANA = new Gpio(18, {mode: Gpio.OUTPUT})   // alt = 19 / 18
   let dutyCycle = 0
   WATER.pwmFrequency(2000)
   SABIANA.pwmFrequency(2000)
   console.log("starting GPIO 12/18 : " + WATER.getPwmFrequency() +" : " +SABIANA.getPwmFrequency())
   setInterval(() => {
      WATER.pwmWrite(dutyCycle)
      SABIANA.pwmWrite(dutyCycle)
      console.log("WATER / SABIANA : " + dutyCycle)
      dutyCycle += 15
      if (dutyCycle > 255) { dutyCycle = 0 }
      }, 20000)    // n-seconds
}
