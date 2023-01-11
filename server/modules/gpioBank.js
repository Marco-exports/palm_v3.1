exports.GpioToPin = (inputArray) => {
   // console.log(' --> inputArray: ' + inputArray)
   let output = []     // default = null array
   // Gpio's --> WINDOW = { 17,22,23,24 }  (PIR = 6:23) (LIGHT = 25:4)

   const GpioPins = { 17:6, 22:5, 23:12, 24:7, 4:25, 6:23, 25:4 }   // binary-> RPi_GPIO : GpioBank
   const GpioNames = {17:'W1',22:'W2',23:'W3',24:'W4',6:'PIR',25:'LIGHT'}

   if (process.platform === 'linux') {
      const pigpio = require('pigpio')
      const GpioBank = pigpio.GpioBank
      let myBank = new GpioBank()
      let BankRead = myBank.read().toString(2)   // read RPi -> BANK1

      // console.log("BANK1 -> "+ BankRead)
      // 10000110000101000000111111111   (total 30)
      // 10001000000101100000110111111   (PIR GPIO = 6:23)

      for (const GpioPin of inputArray ){
         for (const Pin in GpioPins) {
            if (GpioPin == Pin) { output.push(GpioPins[GpioPin])}
         }   // do not use '==='
         // input = 17 --> output = 6  // output->[6,5,12,7]
      }
      let BankPins =""
      for(const i of output){ BankPins = BankPins + (BankRead.substr((i-1), 1)) }
         //console.log(BankRead.substr((i-1), 1))
      BankPinOut = [...BankPins+'']
     // console.log(" --> "+ BankRead + ' : ' + [...BankPins+''])
   }
   return (BankPinOut)
}
