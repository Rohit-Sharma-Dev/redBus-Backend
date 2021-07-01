const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth=require("../middleware/users")

const User = require("../models/Users");
const userInfo=require('../controllers/users')

//@route  POST api/users
//desc    Register user
//access  public

router.post("/signUp",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "please include a valid email").isEmail(),
        check(
            "password",
            "please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],userInfo.signup
    
);



//@route  POST api/auth
//desc    Authenticate/login user & get token
//access  public

router.post("/login",
    [
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required").exists(),
    ],userInfo.login)

router.put('/login/forgotpassword',auth,userInfo.forgotpassword)


module.exports = router;

