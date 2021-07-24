// const {loginadmin}=require("../controllers/users")
const Locations= require("../models/Location");
const {validationResult}=require('express-validator')

module.exports.location = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(404).json({msg:"not found any data"})
    }

    const {city,state}=req.body
   
    try {
       console.log("djhfhdoiwsoiufh")
        let location=await Locations.findOne({city,state})
        if(location){
            return res.status(400).json({msg:"location already exist"})
        }
        location=new Locations({city,state});
        await location.save();
        res.status(200).json({msg:"location added......hurraahhh"});
        console.log("rewmokeoekok")
    } catch (err) {
        console.log(err,"reqijuksnkdjwnwjnjdn")
        return res.status(500).json({msg:"error occured"})
    }
 
}
