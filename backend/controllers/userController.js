const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc     register a user 
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password1 } = req.body
    if(!name || !email || !password1) {
        res.status(400)
        throw new Error('please enter all fields')
    }
    //find if user already exists by email
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('user already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password1, salt)
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    //if user created
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('invalid user data');
    }

    res.send('register user')
})

//@desc     login a user 
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    //check user and password match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid credentials')
    }
})

//@desc     get current user
//@route    /api/users/me
//@access   private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { 
    registerUser,
    loginUser,
    getMe,
}