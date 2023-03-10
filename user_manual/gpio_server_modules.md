# PALM server modules

### gpioBankRead

###    BANK1 -> BankRead
###    10000110000101000000111111111   
(first 30 pins)

      var GpioPin = new Array ( )
      GpioPin[0] = ["W1", 17, 6]   -> Gpio = 17  /  bank position = 6
      GpioPin[1] = ["W2", 22, 5]
      GpioPin[2] = ["W3", 23, 12]
      GpioPin[3] = ["W4", 24, 7]
      GpioPin[4] = ["PIR", 6, 23]   -> Gpio = 6  /  bank position = 23
      GpioPin[5] = ["DAY", 25, 4]

#### return -->  "[ BK:1, W1:0, W2:1, W3:1, W4:0, PIR:0, DAY:1, DT: 09:50 ]"
