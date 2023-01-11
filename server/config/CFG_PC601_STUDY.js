module.exports = {
    _id: "CFG_PC601_STUDY",
    name: "Palm Cay 601 STUDY",     // pre-set conditions for room...
    PIR_GPIO: 6,            // PIR on GPIO 6
    DHT_GPIO_1: 5,          // primary DHT
    DHT_GPIO_2: 999,         // secondary DHT
    DS18_GPIO: 4,          //DS18BO020 -> one wire TEMP
    LightSensor: 25,
    fan_GPIO: 12,
    cold_GPIO: 13,
    fan_speed: [32,55,78,100],
    SAVE_EVERY: 5,         // save STAT after 5 minutes of Last_Touched
    publish_every: 120, 	// 120 secs to SQL
    temp_calibrate: -0.5,  // +/- 0.75 F  calibration on DHT sensor
    cool_min: 66,		       // min cooling: 66 F
    cool_max: 86,		       // max cooling: 86 F
    cool_fan_min: 20,		 // fan min cooling: 20%
    cool_fan_max: 80,		 // fan max cooling: 80%
    heat_min: 70,		// min heating: 70 F
    heat_max: 85,		// max heating: 85 F
    heat_fan_min: 20,		// fan min heating: 20%
    heat_fan_max: 80,		// fan max heating: 80%
    chill_max: 100,		// 100%
    chill_med: 50,		// 50%
    chill_low: 20,		// 20%
    reduce_chill: 20,	    // 20% chiller valve close on PIR delay
    PIR_delay: 30,		    // 30 minutes of presence
    DAY_night_start: "19:00",	  // 08:00 hour
    DAY_night_end: "07:00",	  // 00:00 hour
    PIR_state: 1,			 // PIR enabled = 1
    windows: [
        {_id:'W1',Gpio:17,'order':1,win:'Side Window',open:0,delay:10,state:1 },
        {_id:'W2',Gpio:23,'order':2,win:'Right Window',open:0,delay:20,state:0 },
        {_id:'W3',Gpio:24,'order':3,win:'Left Window',open:0,delay:40,state:0 },
        {_id:'W4',Gpio:22,'order':4,win:'Bathroom Window',open:0,delay:50,state:1 },
        {_id:'W5',Gpio:27,'order':5,win:'Sliding Door',open:0,delay:60,state:0 }
] }
