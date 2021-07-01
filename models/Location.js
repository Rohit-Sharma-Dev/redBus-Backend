const mongoose = require('mongoose');
const locationSchema= new mongoose.Schema({
city:type(String),
state:type( String ),
stop:type( array ),
})

const location= mongoose.model('locations',locationSchema)
module.exports=location