var express = require('express')
var router = express.Router();
var gpio = require('../config/gpio')

var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())

router.get('hcswitch/:id',(req,res)=>{
    param = req.params.id.substring(2);
    if(req.body.switch1 == true)
    {
        res.json({
            result : gpio.defaulton()
        })
    }
})
module.exports = router
