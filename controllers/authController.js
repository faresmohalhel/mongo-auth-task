const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');


exports.signup = catchAsync(async (req , res , next)=>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    });
const token = jwt.sign({id:newUser._id} , process.env.SECRET_KEY , {expiresIn:process.env.EXPIRES_IN})
    res.status(201).json({
        status: 'success',
        token,
        data:{
            user:newUser
        }
    })
    next();
})



exports.login = catchAsync(async (req , res , next)=>{
    const {email , password} = req.body;

    // 1- check if email and password are exist
    if(!email || !password){
      return  next( new AppError('please provide email and password!' , 400))
    }

 // 2- check if user exist && password is correct
 
 const user = await User.findOne({email}).select('+password')
 console.log(user)


// 3) If everything ok, send token to client

const token = '66666666666666' // fake token

    res.status(200).json({
        status:'success',
        token
    })
})