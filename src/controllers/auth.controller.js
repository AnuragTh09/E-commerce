// signup a user

import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customErrors.js";
import {User} from "../models/user.model.js"

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
}

export const signUp = asyncHandler(async(req, res) => {
    //get data from user
    const { name, email, password } = req.body;

    //validation
    if(!name || !email || !password){
        throw new CustomError("Please add all fields", 400)
        // or
        // throw new Error("error")
    }

    // lets add data to database

    //check if user is already exist
    const existingUser = await User.findOne({email: email})

    if(existingUser){
        throw new CustomError("User already exists", 400)
    }

    const user = await User.create({
        name,
        email, 
        password
    })

    const token = user.getJWTtoken()
    //safety
    user.password = undefined

    // store this token in user's cookie
    res.cookie("token", token, cookieOptions)

    // send back a response to user
    res.status(200).json({
        success: true,
        token,
        user,
    })


})

// login --
export const login = asyncHandler(async(req, res) => {
    const {email , password} = req.body

// validation 
if(!email || !password){
    throw new CustomError("Please fill all details", 400)
}

const user = User.findOne({email}).select("+password")

if(!user){
    throw new CustomError("Invalid credentials", 400)
}

const isPasswordMatched = await user.comparePassword(password)

if(isPasswordMatched){
    const token = user.getJWTtoken()
    user.password = undefined
    res.cookie("token", token, cookieOptions)
    return res.status(200).json({
        success: true,
        token, 
        user
    })
  }
  throw new CustomError("Password is incorrect!", 400)
})

//logout
export const logout = asyncHandler(async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

export const getProfile = asyncHandler(async(req, res) => {
   const { user } = req

   if(!user){
    throw new CustomError("User not found!", 400)
   }

   res.status(200).json({
    success: true, 
    user
   })
})




