const Agency=require('../models/Agency')

const {validationResult}=require("express-validator");
module.exports.createAgency=async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:"not found any body"})
    }
    const {phone,agencyName,headOfficeLocation}=req.body
    if (!phone || !agencyName || !headOfficeLocation){
        return res.status(401).json({msg:"give the correct input"})
    }

    try {
        console.log("sjikji")
        let agency= await Agency.findOne({agencyName})
        if (agency){
            return res.status(400).json({ errors:"agency already exist"})
        }
        console.log("lllllll")
        agency=new Agency({
            agent: req.user.id,
            phone,
            agencyName,
            headOfficeLocation
        })

        await agency.save()
        console.log("dskjdkj")
        res.status(200).json({msg:"agency has been added....."})
    } catch (err) {
        console.log("agency")
        return res.status(400).json({msg:"helloooo ji"})
    }
}
