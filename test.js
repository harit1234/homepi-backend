var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/knightIds',(err)=>{
    if(err)console.log(err)
    else
    console.log('connected')
});
console.log(mongoose.find({username:'harit'}))