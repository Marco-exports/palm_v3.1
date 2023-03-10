
# STAT config files (ROOM / CFG)

    global.ROOM = require('./CFG_ROOM')  // get ROOM => "PC601_STUDY"
    global.ROOM_ID = require('./CFG_' + ROOM.room_ID)      // "CFG_PC601_STUDY"
    global.ROOM_WIN = ROOM_ID.windows  // windows in : "CFG_PC601_STUDY"
    global.ROOM_ID_STAT = require('./STAT_' + ROOM.room_ID)   // replace with JSON version
    global.ROOM_ID_STATx = require('./STAT_' + ROOM.room_ID + '.json')
    global.ROOM_ID_HIST = require('./HIST_' + ROOM.room_ID)
    global.ROOM_ID_LOG = './logs/LOG_' + ROOM.room_ID + '_' + moment().format("YYYY-MM-DD")
