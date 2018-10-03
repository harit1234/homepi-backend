var express = require ('express')
var router = express.Router()

var bodyparser = require('body-parser')
router.use(bodyparser.json())
router.use(bodyparser.urlencoded({extended:true}))

var spawn = require('child_process').spawn
var tokenverify = require('./tokenverify')

router.post('/:id',tokenverify.tokenverify,(req,res)=>{
    buttonStatus = req.body.buttonStatus
    console.log(buttonStatus)
    let python = spawn('python',['/home/pi/Desktop/homepi/backend/homepi-backend/routes/gpio.py',buttonStatus])
    python.stdout.on('data',(data)=>{

        res.json(data.toString())
        console.log('success'+ data)
    })
    python.stderr.on('data',(data)=>{
        console.log('failure '+data)
    })
})

module.exports = router