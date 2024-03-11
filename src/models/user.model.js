import mongoose, { Schema } from 'mongoose';
import AuthRoles from '../utils/authRoles';

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: [true, "Please enter a username"],
            unique: true,
            maxLength: [30, "Name should not exceed 30 characters"],
        },
        email:{
            type: String,
            required: [true, "Please enter a email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            mixLength: [8, "password must be at least 8 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
     {timestamps: true});

    

export const User = mongoose.model('User', userSchema);  
