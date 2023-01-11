module.exports = function(io) {
   if (process.platform==='linux') {
      let interval
      const moment = require('moment')
      const GpioToPin = require('./gpioBank').GpioToPin
      console.log("Last PIR :" + ROOM_ID_STATx.PIR_last_seen)
      const RP_PIR = [ROOM_ID.PIR_GPIO]      // Get PIR_GPIO number
      console.log('PIR GPIO : '+ RP_PIR)

      io.on("connection", socket => {
         socket.on('Get_PIRs', function () {getPIRsAndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getPIRsAndEmit(socket), 20000)  // millisec = 20 seconds
      })

      const getPIRsAndEmit = async socket => {
         let GpioPIR = GpioToPin([ROOM_ID.PIR_GPIO])  // let GpioPIR = GpioToPin(RP_PIR)
         // console.log('Get_PIR : ' + GpioPIR)
         socket.emit("PIRs_API", GpioPIR)            // --> send to screen
         socket.broadcast.emit("PIRs_API", GpioPIR)   // broadcast to other clients
         if(GpioPIR === 1) {
            ROOM_ID_STATx.PIR_last_seen = moment().unix()
            console.log(" --> PIR " + moment().format('lll'))
         }
      }
   }
}
