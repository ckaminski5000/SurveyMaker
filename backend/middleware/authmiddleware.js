const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = (req, res, next) => {
    const cookies = req.header.cookies;
   const token = cookies.split("=")[1];
    
    

    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    let decoded = jwt.verify(String(token), process.env.JWT_SECRET);
    console.log(decoded);
      
    req.id = decoded.id;
    console.log(req.id);
    
    next();
}


module.exports = {protect}