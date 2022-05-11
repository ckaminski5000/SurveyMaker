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


//create new Users
//@route POST /Users/create
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400);
        throw new Error('Please add all fields');
    }

    const checkEmailExists = await User.findOne({email: email}).exec();
    console.log(checkEmailExists);
    if(checkEmailExists){
        res.status(401).json({message: 'This user exists.  The email has been taken.'});
    }

    //create Hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    if(user) {
        let token = generateToken(user._id);

        res.cookie(String(user._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        })


        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
        })

       
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//login Users
//@route POST /Users/login
const loginUser = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;

    const user = await User.findOne({email: email})
    const check = await bcrypt.compare(password, user.password)

   if(user && check){
        let token = generateToken(user._id);

        res.cookie('user_id', token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: false,
            sameSite: 'none',
            domain: 'localhost:3000'
        })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            cookies: req.cookies
        })

    }else{
        res.status(400);
        throw new Error('Invalid credentials');
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


//Generate a refresh token

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split(' ')[1];
    console.log('prevToken' + prevToken);
    console.log('req.user ' + req.user);
    //check if there was a previous cookie
    if(!prevToken){
        res.status(402).json({message: "Couldn't find token"})
    }
    //verify that cookie is correct
    jwt.verify(prevToken, process.env.JWT_SECRET);

    //clear the cookie
    res.clearCookie(`${user._id}`)
    req.cookies[`${user._id}`] = '';

    //regenerate new token
    let token = generateToken(user._id);
    
    

    //regenerate cookie
    res.cookie(user._id, token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    })

    req.id = user._id;
    console.log('req.id' + req.id);
    next();
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser, 
    loginUser,
    refreshToken
}