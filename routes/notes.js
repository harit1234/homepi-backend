var express = require('express');
var router = express.Router();
var knightdb = require('../models/knightCredentials');

var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())

var tokencheck = require('./tokenverify')
var tokenverify = tokencheck.tokenverify

router.get('/getnotes/:id',tokenverify,(req,res)=>{
    var param = req.params.id.substring(2)
    var reqNotes = knightdb.find({username:param},(err,doc)=>{
        // console.log(doc,req.params.id)
        if(doc.length!=0){
        res.json({
            notes:doc[0].Notes,
            msg: 'doc found'
        })
        }
        else{
        res.json({msg:'no doc found'})
        }
        if(err)
        {res.json({msg:`db err: ${err}`})}
    })
    
   })

router.post('/postnote/:id',tokenverify,(req,res)=>
{
    var param = req.params.id.substring(2)
    var newnote = {
        heading : req.body.heading,
        content : req.body.content
    }
    console.log(req.body)
    if(req.body.heading && req.body.content){

        knightdb.update({username:param},{$push:{Notes:newnote}},()=>{console.log("pushed")});    //push newnote in db    
        res.json({
        msg : 'ok'+req.body.heading
    })}
    
    else{
        res.json({msg:'req.body is to weird for db'+req.body.heading})
    }
})


router.post('/deletenote/:id',tokenverify,(req,res)=>{
    var param = req.params.id.substring(2)
    knightdb.update({username:param},{$pull:{Notes:{heading:req.body.heading,content:req.body.content}}},{safe:true},()=>{
        res.json
        ({
            msg:'deleted'});

    })
})

module.exports = router;