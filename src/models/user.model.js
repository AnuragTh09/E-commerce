import mongoose, { Schema } from 'mongoose';
import AuthRoles from '../utils/authRoles';
import bcryptjs from 'bcryptjs';

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

    // encrypt the password before saving

    userSchema.pre("save", async function(next) {
        if(!this.isModified("password")) return next();
        this.password = await bcryptjs.hash(this.password, 10)
        next()
    })


    userSchema.methods = {
        // comparing the password
        comparePassword: async function(enteredPassword){
           return await bcrypt.compare(enteredPassword, this.password)
        }
        
    }

export const User = mongoose.model('User', userSchema); 
