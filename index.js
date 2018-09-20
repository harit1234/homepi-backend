var express = require('express');
var app = express();
var mongoose = require('mongoose');
// db connection
mongoose.connect('mongodb://harit:dhruvsumi123@ds163162.mlab.com:63162/homepi-harit',{useNewUrlParser: true},(err)=>{
    if(err){console.log(err)}
    else{
        console.log('connected to db')
    }
})
//server listening
app.listen(3000,()=>{
    console.log('connected')
});
//cors headers config
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    next();
});

var knightdb = require('./models/knightCredentials');//model schema

var parser = require('body-parser')
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
var jwt = require('jsonwebtoken')

//knightSignin request
app.post('/',(req,res)=>{
    if(!req.body.username || !req.body.password)
    {
        res.json({
            msg: "lack of complete info"
        })
    }
    else{
        knightdb.find({username:req.body.username},(err,data)=>{
            if(err){console.log(error)}
            else{
                if(data==[]){
                    res.json({
                        msg:"No record of anointment of such name"
                    })
                }
                else if(data.length==0||data[0].password != req.body.password)
                {
                    res.json({
                        msg: "wrong signature"
                    })
                }
                else{
                    var token = jwt.sign({foo:req.body.username},'secret')
                    res.json({
                        msg: "loggedin",
                        token: token
                    })
                }
            }
        })
    }
})

//------------------------------------------routes---------------------------------------------------------

var notes = require('./routes/notes')//route file
app.use('/notes',notes); //route direct
module.exports = app;