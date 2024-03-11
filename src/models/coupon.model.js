import mongoose, { Schema } from 'mongoose';

const couponSchema = new Schema(
    {
        code: {
            type: String,
            required: [true,"Please provide a coupon code"]
        },
        discount: {
            type: Number,
            default : 0
        },
        active: {
            type: Boolean,
            default: true
        }
        // expiry of coupon , type of payment, some more 
        
    },{timestamps: true});

export const Coupon = mongoose.model("Coupon", couponSchema);
