const RPi_backlight = require("rpi-backlight")
module.exports = function(io) {
   if (process.platform === 'linux') {
      let interval

      io.on("connection", socket => {
         socket.on('Get_BackLight', function (data) {getBacklightAndEmit(socket)})
         if (interval) {clearInterval(interval)}
   interval = setInterval(() => getBacklightAndEmit(socket), 90000)  // millisec = 90 seconds
      })

   const getBacklightAndEmit = async socket => {
      RPi_backlight.getBrightness().then(
            (brightnessValue) => {
               console.log('BackLight_API ' + brightnessValue)
               socket.emit("BackLight_API", brightnessValue)            // --> send to screen
               socket.broadcast.emit("BackLight_API", brightnessValue)   // broadcast to other clients
            })
   }

   const express = require('express')
   const router = express.Router()
   router.use(function (
      req,
      res,
      next) {
      next()
   })

   if (process.platform !== 'darwin') {
      router.route('/getBrightness')
         .get((req, res) => {
            console.log('--> getBrightness...')
            RPi_backlight.getBrightness().then(
               (brightnessValue) => {
                  res.send('Screen bright: ' + brightnessValue)
                  console.log('getBrightness: ' + brightnessValue)
               })
         })

      router.route('/setBrightness/:value')
         .get((req, res) => {
            RPi_backlight.setBrightness(req.params.value).then(() => {
               return backlight.getBrightness()
            }).then((newBrightnessValue) => {
               res.send('Screen now: ' + newBrightnessValue)
               console.log('setBrightness: ' + newBrightnessValue)
            }).catch((err) => {
               backlight.getMaxBrightness().then((maxBrightnessValue) => {
                  if (req.params.value > maxBrightnessValue) {
                     res.send('ERR: Max is ' + maxBrightnessValue)
                  } else {
                     res.send('ERR: Min value is 0')
                  }
               })
            })
         })
   } else {

      router.route('/setBrightness/:value')
         .get((req, res) => {
            res.send('Screen bright: NIL')
         })

      router.route('/getBrightness')
         .get((req, res) => {
            res.send('Screen bright: NIL')
         })
   }
}}

module.exports.router = router

//backlight.getBrightness()
//backlight.setBrightness(value) // The screen goes Off at <= 9 brightness value
//backlight.getMaxBrightness()
