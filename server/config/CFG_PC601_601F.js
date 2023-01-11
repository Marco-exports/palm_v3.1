module.exports = {
    _id: "CFG_PC601_601_F",
    name: "Palm Cay 601_Front",
    fan_GPIO: 12,
    cold_GPIO: 13,
    publish_every: 120, 	// 120 secs to Firebase.
    admin_overide: 0,		// 0 = user, 1 = sys admin ON
    admin_delay: 30,		// 30 minutes till cancel sys admin overide
    cool_temp_min: 22,		// min cooling: 22 C
    cool_temp_max: 28,		// max cooling: 30 C
    cool_fan_min: 20,		// fan min cooling: 20%
    cool_fan_max: 80,		// fan max cooling: 80%
    heat_temp_min: 22,		// min heating: 22 C
    heat_temp_max: 26,		// max heating: 26 C
    heat_fan_min: 20,		// fan min heating: 20%
    heat_fan_max: 80,		// fan max heating: 80%
    chiller_max: 100,		// 100%
    chiller_med: 50,		// 100%
    chiller_low: 20,		// 100%
    reduce_chiller: 20,	// 20% chiller valve close on PIR delay
    PIR_delay: 30,		// 30 minutes of presence
    PIR_night_start: "20:30",	// 20:30 hour
    PIR_night_end: "08:00",	// 07:30 hour
    PIR_state: 1,			// PIR enabled = 1
    windows: [
        {
            _id: "bath",
            ops_state: 1,  		// 1 = online, 0 = offline
            delay: 30,			// 30 seconds
            shutdown_delay: 600,		//10 minutes
            RPi_GPIO: 17,
            message: "Bathroom window"
        },{
            _id: "side_window",
            ops_state: 1,  		// 1 = online, 0 = offline
            delay: 60,			// 60 seconds
            shutdown_delay: 600,		//10 minutes (600 secs)
            RPi_GPIO: 22,
            message: "Side window"
        },{
            _id: "left_window",
            ops_state: 1,  		// 1 = online, 0 = offline
            delay: 60,			// 60 seconds
            shutdown_delay: 600,		//10 minutes (600 secs)
            RPi_GPIO: 23,
            message: "Left window"
        },{
            _id: "right_window",
            ops_state: 1,  		// 1 = online, 0 = offline
            delay: 60,			// 60 seconds
            shutdown_delay: 600,		//10 minutes (600 secs)
            RPi_GPIO: 24,
            message: "Right window"
        }
    ]
};
