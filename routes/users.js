const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth=require("../middleware/users")
const {signup,login,userbyId,deleteAccount}=require('../controllers/users')
const {getBus} =require('../controllers/Bus')
const {bookTickets}= require('../controllers/booktickets')


//@route  POST api/users
//desc    Register user
//access  public

router.post("/signup",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "please include a valid email").isEmail(),
        check(
            "password",
            "please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],signup);



//@route  POST api/auth
//desc    Authenticate/login user & get token
//access  public

router.post("/login",
    [
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required").exists(),
    ],login)



// get user by _id
router.get('/',auth,userbyId)


// searcbus

router.post('/searchbus',[auth,[
    check("from","souce location is require").not().isEmpty(),
    check("to","destination location is require").not().isEmpty()
]],getBus)


// book ticket
router.post("/bookTicket",[auth,[
    check("seats_no","seat no is required").not().isEmpty(),
    check("passengers","passengers names are required").not().isEmpty(),
    check("journeyDate","journeyDate is required").not().isEmpty(),
    check("email","email is required").isEmail()
]],bookTickets)



// delete Acoount
router.delete("/",auth,deleteAccount)


module.exports = router;

