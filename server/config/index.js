var moment = require('moment')
const fs = require('fs')

global.ROOM = require('./CFG_ROOM')                    // ROOM name ==> "PC601_STUDY"
global.ROOM_ID = require('./CFG_' + ROOM.room_ID)      // ROOM_ID ==>  CFG_PC601_STUDY.js
global.ROOM_WIN = ROOM_ID.windows                      // windows in : CFG_PC601_STUDY.js
global.ROOM_ID_STAT = require('./STAT_' + ROOM.room_ID)
global.ROOM_ID_STATx = require('./STAT_' + ROOM.room_ID + '.json')   // create JSON version of "STAT"
global.ROOM_ID_LOG = './logs/LOG_' + ROOM.room_ID + '_' + moment().format("YYYY-MM-DD")

console.log(" ROOM_Id : " + ROOM_ID._id)
console.log(' LOG : ' + ROOM_ID_LOG)          // path to current LOG

global.JSON_SAVED = moment().unix()            // only on start-up
console.log(' LAST_Touched : ' + JSON_SAVED)
console.log(' FAN_SPEED : ' + ROOM_ID.fan_speed)

// ROLL-OVER LOG FILE
fs.access(ROOM_ID_LOG, fs.constants.F_OK, (err) => {
     if (err) {  // file not found...
          fs.appendFile(ROOM_ID_LOG, '...', function (err) {
               if (err) throw err
               console.log(' > Log file created : ' + ROOM_ID_LOG)
          })
     }
})


// global.ROOM_ID_HIST = require('./HIST_' + ROOM.room_ID)
// global.ROOM_ID_LOG = './logs/LOG_' + ROOM.room_ID + '_' + moment().format("YYYY-MM-DD")
