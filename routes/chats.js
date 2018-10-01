var express = require('express')
var router = express.Router();

var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())
var knightdb = require('../models/knightCredentials')
// var globdb = require('../models/globalchat')

var tokenver = require('./tokenverify')
var tokenverify = tokenver.tokenverify

router.get('/getchats/:id',tokenverify,(req,res)=>{
var param = req.params.id.substring(2)
knightdb.find({username:param},(err,data)=>{
    if(err)
    {res.json({msg:err})}
    else{
        res.json({
            chats: data[0].Messages
        })
    }
})
})

router.post('/sendmsg/:id',(req,res)=>{
    var param = req.params.id.substring(2)
})


module.exports = router;