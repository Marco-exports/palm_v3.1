const pigpio = require('pigpio')
const Gpio = pigpio.Gpio
console.log('pigpio Hardware Revision: ' + pigpio.hardwareRevision().toString(16));

pigpio.terminate()
pigpio.initialize() // pigpio C library initialized here

for (let gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
   const gpio = new Gpio(gpioNo);
   console.log('GPIO ' + gpioNo + ':' + ' mode=' + gpio.getMode() + ' level=' + gpio.digitalRead()
   );
}

const window_1 = new Gpio(17, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
window_1.on('interrupt', (level) => {console.log("WINDOW gpio --> open: 17 : " + level)});

//const window_2 = new Gpio(22, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
//window_2.on('interrupt', (level) => {console.log("WINDOW gpio --> open: 22 : " + level)});

//const window_3 = new Gpio(23, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
//window_3.on('interrupt', (level) => {console.log("WINDOW gpio --> open: 23 : " + level )});

//const window_4 = new Gpio(24, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
//window_4.on('interrupt', (level) => {console.log("WINDOW gpio --> open: 24 : " + level)});


var cars = ["22", "23", "24"]
cars[0] = new Gpio(22, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
cars[0].on('interrupt', (level) => {console.log("WINDOW gpio --> open: 23 : " + level )});
cars[1] = new Gpio(23, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
cars[1].on('interrupt', (level) => {console.log("WINDOW gpio --> open: 23 : " + level )});
cars[2] = new Gpio(24, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
cars[2].on('interrupt', (level) => {console.log("WINDOW gpio --> open: 23 : " + level )});

