const Bus = require('../models/Bus');
const User = require('../models/Users');
const Staff = require('../models/Staff');
const location = require('../models/Location');
const Agency=require('../models/Agency')
const { validationResult } = require('express-validator');

const staffSearch = (phone) => {
  return new Promise((res, rej) => {
    let staff = Staff.findOne({ phone });
    if (staff) {
      res(staff);
    }
  });
};

const generateseat=(seats)=>{
  const bus_size = ['A', 'B', 'C', 'D'];
  let seatscreated = [];
for (var i = 0; i < seats; i++) {
  let b = [];
  for (var j = 0; j <4; j++) {
    b.push(i + 1 + '' + bus_size[j] + ' ');
  }
  seatscreated.push(b);
  return seatscreated
}}


module.exports.createBus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg:"checking...."});
  }
  const {
    busName,
    vehicleNo,
    seats,
    busType,
    seatCategory,
    policy,
    images,
    from,
    to,
    fare,
    arrivalTime,
    departureTime
  } = req.body;
  let {driver, helper}=req.body;

  let busDetails = {
    busName,
    vehicleNo,
    policy,
    images,
    fare,
    arrivalTime,
    departureTime,
  };

  if (seatCategory) busDetails.seatCategory = seatCategory;
  if (busType) busDetails.busType = busType;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if(agencyProfile){
      let bus=await Bus.findOne({vehicleNo})
      console.log(bus)
      busDetails.agency=agencyProfile._id
      busDetails.seats=generateseat(seats)
      console.log(generateseat(seats))

      let fromLocation=await location.findOne({"city":from})
      let toLocation=await location.findOne({"city":to})
      if (!toLocation || !fromLocation) {
        return res.status(404).json({ msg: "No such location found" });
      }

      busDetails.driver = driver;
      busDetails.helper = helper;
      busDetails.from = fromLocation._id;
      busDetails.to = toLocation._id;
      console.log("jklmno")
      
      if (bus) {
        bus = await Bus.findOneAndUpdate(
          { vehicleNo },
          { $set: busDetails },
          { new: true }
        );
        return res.status(200).json(bus);
      }

      // if (id) busDetails._id = id;

      bus = new Bus(busDetails);

      console.log("done successfully");
      await bus.save();
      res.status(200).json(bus);

    } else {
      return res.status(400).json({ msg: "No agency found of current admin" });
    }}
    catch (err) {
      console.log(err)
      res.status(500).json({msg:"server error"})
  }
};


module.exports.getBus=async(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.status(400).json({errors:errors.array()})
  }
  let {from ,to,date}=req.body
   try {
     from =await location.findOne({"city":from})
     to=await location.findOne({"city":to})
    
     if (!from || !to) {
      return res.status(400).json({msg:"location not found"});
    }

    let buses = await Bus.find({
      $and: [{ to:to }, { from: from }],
    }).populate("from",["city","state"]).populate("to",["city","state"])
    if (!buses) {
      return res.status(400).json([]);
    }
    return res.status(200).json(buses);
   } catch (err) {
     console.log(err)
     res.status(500).json({msg:"not found"})
   }
}
