const mongoose = require('mongoose');
const locationSchema= new mongoose.Schema({
city:{
    type:String,
    required:true
},
state:{ 
    type:String,
    required:true
    }
})

const location= mongoose.model('locations',locationSchema)
module.exports=location