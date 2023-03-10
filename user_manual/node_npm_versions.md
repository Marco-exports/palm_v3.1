### Full RPi upgrade:   sudo apt full-upgrade  (1+ hours)

### Open web page:
    https://lindevs.com/install-node-js-and-npm-on-raspberry-pi

    https://linuxhint.com/install-node-js-raspberry-pi/

### Choose node : v14
    curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    sudo apt-get install -y nodejs

### You may also need development tools to build native addons:
     sudo apt-get install gcc g++ make

### To install the Yarn package manager, run:
     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
     echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn

###  https://github.com/nodesource/distributions#installation-instructions


### Uninstall Node.js from Raspberry Pi
### https://linuxhint.com/uninstall-node-js-raspberry-pi/