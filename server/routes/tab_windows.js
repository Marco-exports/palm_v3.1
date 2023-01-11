const express = require('express')
const router = express.Router()
const fs = require('fs')
var _ = require('lodash')

router.use(function(req, res, next) { next()})
router.route('/Windows')      // load FAN SPEEDS...
   .get(function (req, res) {
      let Windows = (ROOM_ID.windows);  // JSON.stringify
      res.send(  JSON.stringify(Windows)   )
      console.log("TabsWindow request : " +  JSON.stringify(ROOM_ID.windows) )
   })

   .post(function (req, res) { const objTxt = JSON.parse(JSON.stringify(req.body))
      res.end("SAVE Windows > ");
      [].forEach.call(objTxt, function(inst, i){
         [].forEach.call(Object.keys(inst),function(y){if(!isNaN(objTxt[i][y])) objTxt[i][y] = +objTxt[i][y]})
      })
      fs.readFile(process.cwd()+'/server/config/CFG_'+ROOM.room_ID+'.js',"utf8",function (err, data) {
         if (err) console.log(err)
         else MyText = data

         MyText = MyText.slice(0, MyText.indexOf("windows: [")+9)

         fs.writeFile(process.cwd()+'/server/config/CFG_'+ROOM.room_ID+'.js',
            MyText + JSON.stringify(objTxt,null,4) + " }",
            function (err) {

            if (err) return console.log(err)
            ROOM_ID.windows = objTxt
            let infotab = '[  '
            ROOM_ID.windows.forEach(function(item, index){
               infotab = infotab + item._id + ':'+item.state + '  '
               _.find(ROOM_ID_STATx.windows, { _id: item._id }).state = item.state
            })
            fs.writeFile('./server/config/STAT_'+ROOM.room_ID+'.json', JSON.stringify(ROOM_ID_STATx, null, '\t'),
               (err) => {
                  if (err) throw err
                  console.log('JSON saved...(tab_windows) ' + infotab+']')
               });
            //  console.log(ROOM_ID_STATx.windows);
         });
      })

   })

module.exports.router = router
