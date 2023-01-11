module.exports = {
    _id: "HIST_PC601_601F",
    name: "Palm Cay 601_F",
    version: 0,
    DT_time: 0,
    set_temp: 0,
    hi_temp:  0,
    lo_temp:  0,	// C
    hi_humid:  0,
    lo_humid:  0,   // 0 %
    fan: 0,		// fan coil 55%
    valve: 0,   // valve open 55%
    windows: [
        {
            _id: "side_window",
            on: 1,  		// 1 = online, 0 = offline
            open: 0,  	        // minutes
            c_open: 0		// num times open
        },{
            _id: "left_window",
            on: 1,
            open: 0,
            c_open: 0
        },{
            _id: "right_window",
            on: 1,
            open: 0,
            c_open: 0
        }
    ]
};

// runs every hour -- produced by NODE.JS
