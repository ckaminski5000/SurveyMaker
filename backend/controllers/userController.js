//CRUD options to update database with inventory items
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// get all Users
//@route GET /Users
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.id});
    res.status(200).json(user);
})




//login Users or create users
//@route POST /Users/login
const loginOrCreateUser = asyncHandler(async (req, res) => {
    const { name, email, _id } = req.body;
    console.log(req.body)
    const user = await User.findOne({email: email}).exec();
    if(user){
        res.status(200).json(user);
    }
    else{
        const newUser = await User.create({
            name: name,
            email: email,
            _id: _id
        })
    
        if(newUser) {
            res.status(201).json({
                _id: _id,
                name: name,
                email: email,
            })
        } else{
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
    
})


//update Users
//@route PUT /Users/update
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error('That user was not found.');
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);
})



//delete Users
//@route DELETE /Users/delete
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error('That user was not found.');
    }
    await User.deleteOne({ _id: req.params.id});
    const existState = await User.findOne({_id: req.params.id})
    res.status(200).json({id: req.params.id, exists: existState});
})


//Generate a token - JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "35s"})
}



module.exports = {
    getUser,
    updateUser,
    deleteUser, 
    loginOrCreateUser
}