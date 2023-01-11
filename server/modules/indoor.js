module.exports = function(io) {
    'use strict'
    let interval
    const moment = require('moment')
    let temp_humid = {temp : 70, humid : 99}    //temporary
    if (process.platform==='linux') {
        const dht = require('../rpio-nodes/pigpio_DHT')
        const Gpio = 5
        const sensor = dht(Gpio,22)
        setInterval(()=> {sensor.read()},20000) // every 20 seconds
        sensor.on('result', data => {
            temp_humid = {
                temp : C_to_F(data.temperature),
                humid : round(data.humidity, 1.0)
            }
            CFG_save_DHT( temp_humid )   // store statistics
        })
        sensor.on('badChecksum', () => {
            console.log('INDOOR: bad checksum ')
        })

        io.on("connection", socket => {
            socket.on('GetIndoor', function (data) {getTempHumidAndEmit(socket)})
            if (interval) {clearInterval(interval)}
            interval = setInterval(() => getTempHumidAndEmit(socket), 20000)  // sensor read 20 seconds
        })

        const getTempHumidAndEmit = async socket =>{
            if(temp_humid.humid<101){
                console.log("  INDOOR:", moment().format("HH:mm") + " " + JSON.stringify(temp_humid))   // << 99% humidity
                socket.emit("Indoor_API", temp_humid)   // send to screen
                socket.broadcast.emit("Indoor_API", temp_humid)   // other screens
            }
          //  var backlight = require('rpi-backlight')
           // console.log("BRIGHTNESS "+ await backlight.getBrightness())
        }

    }else{
        io.on("connection", socket => {
            socket.on('GetIndoor', function (data) {
                socket.emit("Indoor_API", temp_humid)   // send to screen
                socket.broadcast.emit("Indoor_API", temp_humid)   // other screens
                console.log("PLATFORM : DARWIN MacOS : "+ temp_humid)
            })
        })
    }
}

function round(value, step) {    //round(2.74,0.25)=2.75 // round(2.74,0.5)=2.5 // round(2.74,1.0)=3.0
    step || (step = 1.0)
    var inv = 1.0 / step
    return Math.round(value * inv) / inv
}

function C_to_F (value){
    return Math.round((value*1.8)+32+ROOM_ID.temp_calibrate)     // calibrate DHT
}

function CFG_save_DHT( TempHumid ){
    let moment
    let vDay = ''
    const STAT_saver = require('./STAT_save')
    moment = require('moment')
    ROOM_ID_STATx.humid_now = TempHumid.humid
    ROOM_ID_STATx.temp_now = TempHumid.temp

    if (ROOM_ID_STATx.temp_humid_day < moment().format('DDD')){    // roll-over increment to next day
        ROOM_ID_STATx.temp_humid_day = Number(moment().format('DDD'))
        console.log("temp_humid_day : " + ROOM_ID_STATx.temp_humid_day + ' (saved)')
        STAT_saver(1)   // save immediate
        ROOM_ID_STATx.temp24_hi = TempHumid.temp        // re-set value overnight
        ROOM_ID_STATx.temp24_low = TempHumid.temp
        ROOM_ID_STATx.humid24_hi = TempHumid.humid
        ROOM_ID_STATx.humid24_low = TempHumid.humid
    }
    vDay = " ("+ ROOM_ID_STATx.temp_humid_day+")"
    if((ROOM_ID_STATx.temp24_hi < TempHumid.temp)||(ROOM_ID_STATx.temp24_hi === 10)){
        ROOM_ID_STATx.temp24_hi = TempHumid.temp
        console.log("temp24_hi : " + ROOM_ID_STATx.temp24_hi + vDay)
    }
    if((ROOM_ID_STATx.temp24_low > TempHumid.temp)||(ROOM_ID_STATx.temp24_low === 10)){
        ROOM_ID_STATx.temp24_low = TempHumid.temp
        console.log("temp24_low : " + ROOM_ID_STATx.temp24_low + vDay)
    }
    if((ROOM_ID_STATx.humid24_hi < TempHumid.humid)||(ROOM_ID_STATx.humid24_hi === 100)){
        ROOM_ID_STATx.humid24_hi = TempHumid.humid
        console.log("humid24_hi : " + ROOM_ID_STATx.humid24_hi + vDay)
    }
    if((ROOM_ID_STATx.humid24_low > TempHumid.humid)||(ROOM_ID_STATx.humid24_low === 100)){
        ROOM_ID_STATx.humid24_low = TempHumid.humid
        console.log("humid24_low : " + ROOM_ID_STATx.humid24_low + vDay)
    }
}
