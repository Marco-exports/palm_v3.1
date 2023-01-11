module.exports = function(io) {
    const axios = require('axios');
    var moment = require('moment');
    let interval;   // interval for data (2 seconds)

    io.on("connection", socket => {

        if(interval){ clearInterval(interval)}

        interval = setInterval(() => getRPi_updates(socket),120000);  // millisec = 2 minutes

    });

    const getRPi_updates = async socket => {
        try {
            results = "Data from RPi"       // get data from RPi...

            console.log(" getRPi ", moment(res.data.currently.time * 1000).format("lll"));

            socket.emit("RPi_status", results);   // --> send to window app

        } catch (error) {
            console.error(` > Error : ${error.code}`);
        }
    };
};
