import  {User}  from "../models/user.model.js";
import JWT from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";
import config from "../config/index.config.js";
import CustomError from "../utils/customErrors.js";



export const isLoggedIn = asyncHandler(async(req, res, next) => {
    let token;

    if(req.cookie.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ) {
        token = req.cookie.token || req.headers.authorization.split(" ")[1]
    }

    if(! token){
        throw new CustomError("Not authorized to access this resource", 401)
    }

    try {
        const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET)

        req.user = await User.findById(decodedJwtPayload._id, "name email role")
        next()
    } catch (error) {
        throw new CustomError("Not able to access the route.", 401)

    }
    
})

export const authorize = (...requiredRoles) => asyncHandler( async(req, res, next) => {
    if(!requiredRoles.includes(req.user.role)){
        throw new CustomError("You are not authorized to access this resource")
    }
    next()
})