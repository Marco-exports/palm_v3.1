module.exports = function(io) {
    const axios = require('axios');
    var moment = require('moment');
    let interval;   // interval fetching "dark_sky" weather data

    io.on("connection", socket => {
        socket.on('GetOutdoor', function (data) {
            getApiAndEmit(socket);
            console.log( data);
        });  // get weather
        if(interval){ clearInterval(interval)}
        interval = setInterval(() => getApiAndEmit(socket),240000);  // millisec = 4 minutes
    });

    const getApiAndEmit = async socket => {
        try {
            const res = await axios.get(
                "https://api.darksky.net/forecast/9db961cbb17b1499d96c87c58cd56afa/25.0407,-77.4701"
                // "https://api.darksky.net/forecast/e0db0dc6e6eba46971a5b1a853baf2fd/43.7695,11.2558"
            );
            console.log("  OUTDOOR: ", moment(res.data.currently.time * 1000).format("lll"));
            socket.emit("WeatherAPI", res.data.currently);   // reply from DARKSKY --> send to screen
            socket.broadcast.emit("WeatherAPI", res.data.currently);   // broadcast to other clients
        } catch (error) {
            console.error(` > Error WEATHER: ${error.code}`);
        }
    };
};
