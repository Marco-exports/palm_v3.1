module.exports = function(io) {
   if (process.platform === 'linux') {
      const RPi_backlight = require("rpi-backlight")
      let interval

      io.on("connection", socket => {

         socket.on('Get_BackLight', function () { getBacklightAndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getBacklightAndEmit(socket), 10000)  // millisec = 90 seconds

         socket.on('Set_Brightness', function (data) {
            console.log( 'Set_Brightness -> ' + data )
            RPi_backlight.setBrightness(data)
         })
      })

      const getBacklightAndEmit = async socket => {
         RPi_backlight.getBrightness().then(
            (brightnessValue) => {
               // console.log('BackLight_API ' + brightnessValue)
               socket.emit("BackLight_API", brightnessValue)            // --> send to screen
               socket.broadcast.emit("BackLight_API", brightnessValue)   // broadcast to other clients
            })
      }
   }
}

//backlight.getBrightness()
//backlight.setBrightness(value) // The screen goes Off at <= 9 brightness value
//backlight.getMaxBrightness()
