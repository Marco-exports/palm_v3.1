 module.exports = {
    _id: "STAT_PC601_601_O",
    name: "Palm Cay 601_Ocean",
    publish_every: 120, 		// 120 secs to Firebase
    admin_delay: 30,			// 30 minutes till cancel overide (reduce every minute)
    DT_timestamp: 24554987643,		// last update
    DT_open_window: 24554985432,	// resets to 0 on close
    PIR_min_last_seen: 105,		// 105 minutes PIR last detected movement
    delay_remaining: 90,		// 90 seconds remain to shutdown (windows)
    fan_speed: 65,		// 65% current fan speed
    chiller_open: 75,	// 75% current valve open
    temp_now: 23.5,		// 23.5 C
    temp24_max: 32.1,	// 32.1 C HIGH (24 hours)
    temp24_min: 22.6,	// 22.6 C LOW (24 hours)
    humid_now: 68,		 // 68% humidity
    humid24_max: 77,	// 77% humidity HIGH (24 hours)
    humid24_min: 55,	// 55% humidity LOW (24 hours)
    set_temp: 23,		// 23 C set by user
    set_fan: 60,		// 60% fan speed
    windows: [
        {
            _id: "bath_side",
            online: 1,  		// 1 = online, 0 = offline
            open: 0,  		// 1 = open, 0 = closed
            c_open: 0		// n-count num times open
        },{
            _id: "bath_ocean",
            online: 1,  		// 1 = online, 0 = offline
            open: 1,  		// 1 = open, 0 = closed
            c_open: 3		// n-count num times open
        },{
            _id: "door_right",
            online: 1,  		// 1 = online, 0 = offline
            open: 1,  		// 1 = open, 0 = closed
            c_open: 3		// n-count num times open
        },{
            _id: "door_left",
            online: 1,  		// 1 = online, 0 = offline
            open: 1,  		// 1 = open, 0 = closed
            c_open: 3		// n-count num times open
        }
    ]
};
