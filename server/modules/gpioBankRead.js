// const _ = require("lodash");
module.exports = function(io) {
   if (process.platform === 'linux') {
      const _ = require("lodash")
      const moment = require('moment')
      const pigpio = require('pigpio')
      const GpioBank = pigpio.GpioBank
      let myBank = new GpioBank()
      const GpioPin = []
      GpioPin[0] = ["W1", 17, 6]        // BANK-1
      GpioPin[1] = ["W2", 22, 5]
      GpioPin[2] = ["W3", 23, 12]
      GpioPin[3] = ["W4", 24, 7]
      GpioPin[4] = ["W5", 27, 13]
      GpioPin[5] = ["PIR", 6, 23]
      GpioPin[6] = ["DAY", 25, 4]
      // GpioPin[7] = ["W6", 26, 37]    // BANK-2  (WINDOWS)
      // GpioPin[8] = ["W7", 16, 36]
      // GpioPin[9] = ["W8", 20, 38]
      // GpioPin[10]= ["W9", 21, 40]
      let consoleRepeat = ''
      let interval
      let activeWindows = _.filter(ROOM_WIN, {state: 1})   // select on-line windows {state:1}
      // console.log('VALID_WIN: '+ JSON.stringify(activeWindows))   //  {_id:'W1',Gpio:17,'order':1,win:'Side Window',open:0,delay:40,state:1 }
      let delayArray = activeWindows.map((item) => item.delay)   // delayArray = [ 10,50 ]
      let _idArray = activeWindows.map((item) => item._id)   // _idArray = [ W1, W4 ]
      const numWindows = _idArray.length     // 2
      console.log('Windows : ' + _idArray, delayArray, numWindows, 'windows')

      io.on("connection", socket => {
         if (interval) { clearInterval(interval)}
         interval = setInterval(() => getBankAndEmit(socket), 10000)  // 10 seconds
      })

      const getBankAndEmit = async socket => {
         let BankRead = myBank.read().toString(2)   // read RPi -> BANK1 --> 10000110000101000000111111111
         let BankData = ""
         for ( i=0; i<GpioPin.length; i++ ) {
            BankData = BankData + ' ' + GpioPin[i][0] + ':' + BankRead.charAt(GpioPin[i][2]-1)
         }     // W1:0 W2:1 W3:1 W4:0 W5:0 PIR:0 DAY:1
         let WinOPEN = BankData
            .replace('W1:0 ','')       // windows 1-5
            .replace('W2:0 ','')
            .replace('W3:0 ','')
            .replace('W4:0 ','')
            .replace('W5:0','').trim()
         WinOPEN = WinOPEN.substr(0, WinOPEN.search("PIR")).trim()
         let testWinOPEN = WinOPEN
         WinOPEN = WinOPEN.replace('W1','\"W1\"')
            .replace('W2','\"W2\"')
            .replace('W3','\"W3\"')
            .replace('W4','\"W4\"')
            .replace(/ /g,',')

         testWinOPEN = testWinOPEN.replace(/ /g,', ')

         console.log( 'WinOpen :', WinOPEN, _idArray, testWinOPEN )    // "W1":1,"W2":1,"W3":1,"W4":1   [ 'W1', 'W4' ]

         let test = { W1:0,W2:1,W3:1,W4:1,W5:0 }
         // console.log('PICKER :', _.pick(test, _idArray))
         let object = { W1:0,W2:1,W3:1,W4:1,W5:0 }

         console.log(Array.from(  testWinOPEN ))

         console.log('PICKER_X :', _.pick( Array.from( {  testWinOPEN  } ) ) )

         BankData = '[ WX:00'+ BankData +' DT: ' + moment().format("HH:mm:ss") + ' ]  -> ' + WinOPEN
               // [ WX:00 W1:0 W2:1 W3:1 W4:0 W5:0 PIR:0 DAY:1 DT: 21:14:08 ]  -> "W1":1,"W2":1,"W3":1,"W4":1
         if( consoleRepeat !== BankData ){
            consoleRepeat = BankData
            console.log( '    ' + BankData )
         }

         // delayArray[0]._id    // delayArray = [ 40, 30, 20 ]

         socket.broadcast.emit("GpioBank", BankData)
      }
   }
}

const pad = function(a,b){ return ([1e15] + a).slice(-b)}  // pad(num,count) return number w/ leading zeros

//   windows: [
//       {_id:'W1',Gpio:17,'order':1,win:'Side Window',open:0,delay:40,state:1 },
//       {_id:'W2',Gpio:23,'order':2,win:'Right Window',open:0,delay:30,state:1 },
//       {_id:'W3',Gpio:24,'order':3,win:'Left Window',open:0,delay:30,state:1 },
