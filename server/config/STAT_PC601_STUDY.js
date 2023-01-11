 module.exports = {
    _id: "STAT_PC601_STUDY",
    name: "Palm Cay 601 STUDY",
    DT_timestamp: 0,		// last update
    Firebase_published: 0, 		// 0 secs since Firebase
    DT_open_window: 0,	    // resets to 0 on close
    PIR_min_last_seen: 0,		// 60 minutes PIR last detected movement
    delay_remaining: 0,		// 90 seconds remain to shutdown (windows)
    fan_speed: 0,		// 65% current fan speed
    chiller_open: 0,	// 75% current valve open
    temp_now: 33,		// 23.5 C  * * * * * * * * * * * *
    temp24_max: 0,	    // 32.1 C HIGH (24 hours)
    temp24_min: 0,	    // 22.6 C LOW (24 hours)
    humid_now: 0,		 // 0 % humidity
    humid24_max: 0,	    // 0 % humidity HIGH (24 hours)
    humid24_min: 0,	    // 0 % humidity LOW (24 hours)
    set_temp: 0,		// 23 C set by user
    set_fan: 0,		// 0 % fan speed
    windows: [
        {
            _id: "side_window",
            online: 1,  		// 1 = online, 0 = offline
            open: 0,  		// 1 = open, 0 = closed
            ct_open: 0		// n-count num times open
        },{
            _id: "left_window",
            online: 1,  		// 1 = online, 0 = offline
            open: 0,  		// 1 = open, 0 = closed
            ct_open: 0		// n-count num times open
        },{
            _id: "right_window",
            online: 1,  		// 1 = online, 0 = offline
            open: 0,  		// 1 = open, 0 = closed
            ct_open: 0		// n-count num times open
        }
    ]
};
