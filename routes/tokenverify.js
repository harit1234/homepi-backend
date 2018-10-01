var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');
var parser = require('body-parser')
router.use(parser.json());
router.use(parser.urlencoded({extended:true}));

exports.tokenverify = (req,res,next)=>{
    jwt.verify(req.headers.token,'secret',(err,value)=>{
        console.log('req rec from tokenverify');
        console.log(value)
        var param = req.params.id.substring(2)
        if(value){
            if(value.foo == param){
                next();
            }
        }
        else{
            res.json({
                msg:'wrong token'
            })
        }
    })
}