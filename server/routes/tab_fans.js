const express = require('express')
const router = express.Router()
const fs = require('fs')
const replace = require("replace")
router.use(function(
   req,
   res,
   next) {
   next()
})

router.route('/TabsFan')      // load FAN SPEEDS...
   .get(function (req, res) {
      res.send(  ROOM_ID.fan_speed   )
      console.log("TabsFan : " +  ROOM_ID.fan_speed )
   })
   .post(function (req, res) {      // change FAN SPEEDS...
      console.log('  Update FanSpeed : [' + req.body + ']')
      fs.readFile(process.cwd()+'/server/config/CFG_'+ROOM.room_ID+'.js',"utf8",function (err, data) {
         if (err) console.log(err)
         else
            MyText = data
         let pos = MyText.search(/fan_speed:/)
         let fan_text = MyText.substring(pos)
         let fanX = MyText.substring(pos,pos+(fan_text.search(/\]/)+1))
         let fanXXX = fanX.replace(/\[(.*?)\]/,"\\["+"$1"+"\\]")   //fan_speed: /[28,51,76,99/]
         let replaced = "fan_speed: \[" + req.body + "\]";
         replaced = replaced.replace(/\[(.*?)\]/,"\["+"$1"+"\]")
         replace({
            regex: fanXXX,
            replacement: replaced,
            paths: [process.cwd()+'/server/config/CFG_'+ROOM.room_ID+'.js'],
            recursive: false, silent: true
         })
         ROOM_ID.fan_speed = req.body
         res.end("SAVE FanSpeed > " + req.body)   // return result to App
      })
   })

module.exports.router = router
