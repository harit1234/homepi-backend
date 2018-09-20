var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var knightID = new Schema (
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        Messages:[{source:String,message:String}],
        Notes:[{heading:String,content:String}]


    })

module.exports = mongoose.model('knightid' , knightID);