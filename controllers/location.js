const express = require("express");
const router = express.Router();
const config = require("config");
const location = require("../models/Location");

module.exports.addLocation=async(req, res)=>{
    const location=new location(req.body)
    await location.save();
    res.json(location)
}