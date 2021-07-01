const mongoose = require('mongoose');
const Bus= new mongoose.Schema({
Agency_name : type(String),

vehicle_no : type(String),

seats : type(Array),

type : type(String),

seat_category : type(String),

bus_staff : [{name: type(String), role:type(String)}],

policy : type(String),

images:type(array),

emergency_no : type(Number),

location:[ ],

date: type(Date)
})