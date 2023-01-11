module.exports = function(io) {
   io.on("connection", socket => {
      socket.on('getWindows', function (data) {
         console.log('getWindows : ')
         socket.emit("windowsGet", JSON.stringify(ROOM_WIN))   // --> send WINDOWS list to screen
      })
   })
}
