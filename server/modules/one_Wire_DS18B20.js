module.exports = function(io) {
   if (process.platform==='linux') {
      const sensorF = require('ds18b20-raspi')     // round temperature reading to 1 digit
      let interval

      io.on("connection", socket => {
         socket.on('Get_DS18', function (data) {getDS18AndEmit(socket)})
         if (interval) {clearInterval(interval)}
         interval = setInterval(() => getDS18AndEmit(socket), 90000)  // millisec = 90 seconds
      })

      const getDS18AndEmit = async socket => {
         sensorF.readSimpleF(1, (err, temp) => {
            if (err) { console.log( err ) } else {
               console.log('  One_Wire : [' + sensorF.list()+']   ' + temp + ' F')}

            socket.emit("DS18_API", temp + ' F')            // --> send to screen
            socket.broadcast.emit("DS18_API", temp + ' F')   // broadcast to other clients
         })
      }
   }
}

