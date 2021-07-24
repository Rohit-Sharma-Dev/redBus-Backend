const Staff=require('../models/Staff')
const {validationResult}=require('express-validator')

module.exports.addStaff =async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {name,phone,address,isDriver}= req.body
    const staffData = { phone, name, address, isDriver };
    staffData.adminId = req.user.id;
    try {
        
        console.log("sajisi")
        let staff=await Staff.findOne({phone})
        if (staff){
            return res.status(400).json({msg:"already exist"})
        }
        console.log(staff, ":TEST")
        staff=new Staff({
            adminId:req.user.id,
            name,
            phone,
            address,
            isDriver
        })
       
       await staff.save();
       console.log(staff)
        res.status(200).json({msg:"staff added successfully"})

        
    } catch (err) {
        console.log(err)
    }
}

