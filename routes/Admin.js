const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth=require("../middleware/users")
const isAdmin =require('../middleware/isAdmin')
const adminInfo=require('../controllers/users')
const {location}=require('../controllers/location')
const {createBus} =require('../controllers/Bus')
const book_tickets= require('../controllers/booktickets')
const {createAgency}=require('../controllers/Agency')
const {addStaff}=require('../controllers/staff')


//@route  POST api/admin/
//desc    Register admin
//access  public

router.post("/admin/signUp",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "please include a valid email").isEmail(),
        check(
            "password",
            "please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        check(
            "isAdmin",
            "please fill this"
        ).isBoolean()
        
    ],adminInfo.signup);


//@route  POST api/admin/login
//desc    Authenticate/login user & get token
//access  public

router.post("/admin/login",
    [
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required")
    ]
    ,adminInfo.adminlogin)



// POST /api/admins/admin/addlocation
//desc    Add locations
//access  private

router.post("/admin/location",[auth,
    [
        check("city", "City is required").not().isEmpty(),
        check("state", "State is required").not().isEmpty()
    ]],
    location
);

//@route  POST api/admins/admin/addAgency
//desc    Add addAgency
//access  private

router.post('/admin/addAgency', [auth, [
    check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10, max:10 }),
    check('agencyName', 'Agency name is required')
        .not()
        .isEmpty(),
    check('headOfficeLocation', 'Location of the agency situated is required')
    .not()
    .isEmpty()
]], createAgency)



// POST @route api/admins/:adminId/addStaff

router.post('/:adminId/addStaff',[auth, [
    check('phone', 'Phone number is required')
    .isInt()
    .isLength({ min: 10,max: 10 }),
    check('name', 'Agency name is required').not()
        .isEmpty(),
    check('address', 'Address of the staff is required')
    .not()
    .isEmpty(),
    check('isDriver', 'Position is required')
    .isBoolean()
]],addStaff)


// POST /api/admins/admin/newbus
// Create or Update a bus
// Private Route 
router.post('/addbus',[auth, [
    check('busName', 'Bus name is required')
    .not()
    .isEmpty(),
    check('vehicleNo', 'vehicle number is required')
    .not()
    .isEmpty(),
    check('seats', 'Address of the staff is required')
    .isInt()
    .not()
    .isEmpty(),
    check('driver', 'driver should be inserted')
    .not()
    .isEmpty(),
    check('helper', 'helper should be inserted')
    .not()
    .isEmpty(),
    check('policy', 'policy should be inserted')
    .not()
    .isEmpty(),
    check('from', 'boarding point of the bus is required')
    .not()
    .isEmpty(),
    check('to', 'dropping point of the bus is required')
    .not()
    .isEmpty(),
    check('arrivalTime', 'arrivalTime of the bus is required')
    .not()
    .isEmpty(),
    check('departureTime', 'departureTime of the bus is required')
    .not()
    .isEmpty()
]],createBus)







module.exports = router