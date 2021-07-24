const mongoose=require('mongoose')

const Bus = new mongoose.Schema({
    busName: {
        type: String,
        required:true
    },
    agency:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'agencies'
    },
vehicleNo: {
    type: String,
    unique: true,
    required: true
},
seats: [[{
    type: String,
}]],
busType: {
    type: String,
    enum:['Ac', 'NonAc'],
    default : 'Ac',
},
seatCategory:{
    type: String,
    enum : ['sleeper', 'semi sleeper'],
    default : 'sleeper',
    required:true
},
driver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'staff'
    },
helper:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'staffs'
    },
policy: {
    type: String,
    required:true
},
images:{ data: Buffer, contentType: String },
from:{ // index
        type:mongoose.Schema.Types.ObjectId,
        ref:'locations',
        index:true,
},
to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'locations',
        index : true
   },
arrivalTime: {
    type: String,
    required: true
},
departureTime: {
    type: String,
    required: true
}

},{ 
timestamps: true
})
const bus = mongoose.model('Buses', Bus)
module.exports = bus