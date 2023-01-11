module.exports = function(io) {
    const STAT_saver = require('./STAT_save')
    var moment = require('moment')

    io.on("connection", socket => {
        socket.on('getTemp', function () {
            io.emit("Temp_API", ROOM_ID_STATx.tempSet );     // send to app
            console.log(" NODE sending Temp_API -> " + ROOM_ID_STATx.tempSet)
        })

        socket.on('setTemp', function (data) {
            console.log( 'TRY setTemp -> ' + data.setTemp +' : '+ ROOM_ID.cool_min+' / '+ROOM_ID.cool_max)

            if(data.setTemp > ROOM_ID.cool_max){
                ROOM_ID_STATx.tempSet = ROOM_ID.cool_max
                console.log( 'setTemp -> ' + data.setTemp +' : error -- max temp')
            }
            else if(data.setTemp < ROOM_ID.cool_min){
                ROOM_ID_STATx.tempSet = ROOM_ID.cool_min;
                console.log('setTemp -> ' + data.setTemp+' : error -- min temp')}
            else {
                console.log('setTemp -> ' + data.setTemp);    // set_temperature "data"}
                ROOM_ID_STATx.tempSet = data.setTemp;
            }
                ROOM_ID_STATx.DT_timestamp = moment().format("YYYY-MM-DD HH:mm")

            socket.emit("Temp_API", ROOM_ID_STATx.tempSet );
            socket.broadcast.emit("Temp_API", ROOM_ID_STATx.tempSet );   // broadcast to all open apps

            if(ROOM_ID_STATx.fanSet === 1){     // OFF_LINE
                ROOM_ID_STATx.fanSet = 2
                io.emit("Fan_API", ROOM_ID_STATx.fanSet )     // EMIT --> send to app
                socket.broadcast.emit("Fan_API", ROOM_ID_STATx.fanSet )   //  broadcast to all open apps
                console.log('Fan : OFF-LINE --> AUTO')
            }

            STAT_saver(0 )        // Timeout "STAT_Save" function 5-min...
        })
    })
}
