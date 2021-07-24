const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/Users");

module.exports.signup=async(req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req)
        const { name, email, password,isAdmin} = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User Already Exists" }] });
            }
            user = new User({
                name,
                email,
                password,
                isAdmin
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            console.log(payload,"reoejwojeow")
            const token = getSignedJwtToken(payload)
            res.status(200).json({token})
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg:"server error"});
        }

}



const getSignedJwtToken = function (payload,secret = config.get("jwtsecret"), 
expiresIn = 6000) {
    return jwt.sign(payload, secret, {expiresIn});
}  


module.exports.login =async(req, res)=>{
    
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password} = req.body;
        
        try {
            let user =await User.findOne({ email}) ;
            console.log(user,"ajaasassss")

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(password,user.password,isMatch,"nmmanamnam")
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] 
                });
            }
            
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = getSignedJwtToken(payload)
            return res.status(200).json({token})
        } catch (err) {
            console.log(err,"rojrireijpqjpiojeiojeoiejioj")
            res.status(500).json({msg:"server error"});
        }
    
}


module.exports.userbyId=async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
}



// admin login

module.exports.adminlogin =async(req, res)=>{
    
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password} = req.body;
        
        try {
            let user =await User.findOne({ email}) ;
            console.log(user,"ajaasassss")

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            if(user.isAdmin!=true){
                return res.status(400).json({msg:"you are not an admin"})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(password,user.password,isMatch,"nmmanamnam")
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] 
                });
            }
            
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = getSignedJwtToken(payload)
            return res.status(200).json({token})
        } catch (err) {
            console.log(err,"rojrireijpqjpiojeiojeoiejioj")
            res.status(500).json({msg:"server error"});
        }
    
}


module.exports.deleteAccount=async (req, res) => {
    try {
     
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
