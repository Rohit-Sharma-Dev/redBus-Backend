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

            jwt.sign(
                payload,
                config.get("jwtsecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).send("server error");
        }

}



module.exports.login =async(req, res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email});

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

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

            jwt.sign(
                payload,
                config.get("jwtsecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).send("server error");
        }
    
}



module.exports.forgotpassword=async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password,newPassword,confirmPassword}=req.body
    try {
        let user= await User.findOne({ email})
        if (!user){
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
            
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.send("password isn't matched")
        }
        if(newPassword===confirmPassword){

            const salt = await bcrypt.genSalt(10);

            user.newPassword = await bcrypt.hash(newPassword, salt);
            user= new User({
                email , newpassword
            })
            await user.save();
        }
    } catch (err) {
        res.status(500).send("server error");
    }

}