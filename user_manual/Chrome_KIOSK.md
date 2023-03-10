## sudo nano /etc/xdg/openbox/autostart

#### These things are run when an Openbox X Session is started.
#### You may place a similar script in:  (to run user-specific things)

$HOME/.config/openbox/autostart

#### If you want to use GNOME config tools...

xset -dpms              # turn off display power management system
xset s noblank          # turn off screen blanking
xset s off              # turn off screen saver

#### Remove exit errors from the config files that could trigger a warning

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

#### Run Chromium in kiosk mode

chromium-browser  --noerrdialogs --disable-infobars --kiosk $KIOSK_URL --window-size=1920,1080 --start-fullscreen --incognito --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null --password-store=basic --check-for-update-interval=300000000


## .../etc/xdg/openbox$ 

sudo nano autostart

#### Add commands to turn off power management, screen blanking and screen saving.
#### We don’t want those features in a kiosk.


## These things are run when an Openbox X Session is started.
#### You may place a similar script in:   (to run user-specific things)
 
$HOME/.config/openbox/autostart

## If you want to use GNOME config tools...

xset -dpms              # turn off display power management system
xset s noblank          # turn off screen blanking
xset s off              # turn off screen saver

### Remove exit errors from the config files that could trigger a warning

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

## Run Chromium in kiosk mode:  --window-size=800,480

chromium-browser  --noerrdialogs --disable-infobars --kiosk $KIOSK_URL
--window-size=800,480 --start-fullscreen --incognito --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null --password-store=basic --check-for-update-interval=300000000

## .../etc/xdg/openbox$ sudo nano environment:

## export KIOSK_URL=http://192.168.1.22:8080

### Set system-wide environment variables here for Openbox

#### User-specific variables should be placed in:
 
 $HOME/.config/openbox/environment


### To set language for display messages & time/date formats, use the following:

 LANG=en_CA.UTF8


### To set your keyboard layout, you need to modify your X config:

 http://www.google.com/search?q=how+to+set+keyboard+layout+xorg

