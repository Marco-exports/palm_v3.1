## Chromium in kiosk

  https://www.sylvaindurand.org/launch-chromium-in-kiosk-mode/

#### alternate:
  https://desertbot.io/blog/raspberry-pi-touchscreen-kiosk-setup

#### RPi chromium questions (StackExchange)

  https://raspberrypi.stackexchange.com/questions/tagged/chromium?tab=newest&page=4&pagesize=15

#### Set Chromium URL:

sudo nano/etc/xdg/openbox/environment  -- >>  edit URL

sudo nano/etc/xdg/openbox/autostart  -->>  parameters

sudo nano /etc/xdg/openbox/re.xml   -->>  modify doubleClickTime --> 3000  (3 seconds)

#### List of Chromium Command Line Switches

https://peter.sh/experiments/chromium-command-line-switches/

### Network...
All RPi's on network: [ **arp -a**  ]  == MAC and IP addresses in  LAN from  ARP table.

##### --> sudo rfkill unblock 0

#### sudo nano /etc/dhcpcd.conf
```
interface wlan0
static ip_address=192.168.1.137/24
static routers=192.168.1.254
static domain_name_servers=192.168.1.254
```
### NODE install:

https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/

### set up FTPS to transfer files to RPi:

https://www.raspberrypi.org/documentation/remote-access/ssh/sftp.md

#### `yarn build:`  Builds the app for production to the `build` folder.  Build is minified...

https://facebook.github.io/create-react-app/docs/deployment

### Advanced Configuration & Deployment

 https://facebook.github.io/create-react-app/docs/advanced-configuration
 https://facebook.github.io/create-react-app/docs/deployment

### Installing NODE.js onto RPi

_( installation will be in /home/pi/.nvm/node )_

#### --> insert into: "~/.bash_profile":
```
[ export NVM_DIR="$HOME/.nvm" ]

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  (This loads nvm)

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  (This loads nvm bash_completion)
```

#### Install on RPi --> PM2 -- Process-Manager-2

 --> **npm install pm2 -g**

#### Unused NODE dependencies:

--> **npx depcheck**

# pigpio

A wrapper for the [pigpio C library](https://github.com/joan2937/pigpio) to
enable fast GPIO, PWM, servo control, state change notification and interrupt
handling with **Node.js** on the Raspberry Pi Zero, 1, 2, 3 or 4.

##### https://github.com/fivdi/pigpio

 USE -->    NODE 12.22.4 

##### Make a fresh installation on RPi:

``` 
sudo apt-get install nodejs npm
sudo nvm install 12.22.4
nvm use 12
npm rebuild

sudo apt-get update
sudo apt-get install pigpio

npm install pigpio
```
#### Download and install latest version
**type on RPi:** 

wget https://github.com/joan2937/pigpio/archive/master.zip
```
unzip master.zip
cd pigpio-master
make
sudo make install
```
### pigpio-dht

https://github.com/garyns/pigpio-dht

DHT11 and DHT22 Driver Library based on the pigpio GPIO library.

``pip install pigpio-dht``

### ONE-WIRE

``sudo raspi-config``

##### Select (GPIO 4):  

-->  5. Interfacing Options...

-->  P7. 1-wire  --> activate:  “Yes”

-->  REBOOT

### pi-touchscreen-dimmer

https://github.com/eskdale/pi-touchscreen-dimmer

https://github.com/DougieLawson/backlight_dimmer

~/pi-touchscreen-dimmer$
   
``sudo ./timeout 120 50 event0 event3``

```
Timeout = 120 seconds

Minimum brightness = 50

input events = "event0 event3" 

(find various "eventX" with lsinput)
```

Run program to dim or turn off RPi backlight after a period of time,
turn on when the touchscreen is touched. 

Run script from /etc/rc.local to start at boot.

#### List all your input devices
```
sudo apt install input-utils

type:  lsinput
```

#### If while on BOOT screen is off:

```
sudo bash -c "echo 255 > /sys/class/backlight/rpi_backlight/brightness"
```

#### BACKLIGHT on RPi:
```
 sudo bash -c "echo 1 > /sys/class/backlight/rpi_backlight/bl_power"
 sudo bash -c "echo 0 > /sys/class/backlight/rpi_backlight/bl_power"

 sudo echo 240 > /sys/class/backlight/rpi_backlight/brightness

(echo 1 = screen off, 0 = screen on)
```

### RPi Backlight controller (node.js)

# rpi-backlight
NODE ...library to control the backlight of the [official Raspberry Pi 7" touch display](https://www.raspberrypi.org/products/raspberry-pi-touch-display/)

## Installation

```bash
npm install --save rpi-backlight
```
```javascript
var backlight = require('rpi-backlight');

// All methods return promises.

backlight.powerOn()
backlight.powerOff()
backlight.isPoweredOn()
backlight.getBrightness()
backlight.setBrightness(value) // The screen goes Off at <= 9 brightness value
backlight.getMaxBrightness()
```
xxx

### ApplePiBaker  (SIMM card)

Duplicate / backup of SIMM cards

### Raspberry Pi Imager

Create new SIMM card with latest Raspbian OS.
