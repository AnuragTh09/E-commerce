import mongoose, { Schema } from 'mongoose';
import OrderStatus from './../utils/status.js';
const orderSchema = new Schema(
    {
      product:{
        type: [
            {
                productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product" 
                },
                count: Number,
                price: Number,
            }
        ],
        required: true,
      } ,

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      address: {
        type: String,
        required: true,

      },
      phoneNumber: {
        type: Number,
        required: true,

      },
      amount:{
        type:Number,
        required: true,

      },
      coupon: String,
      transactionId: String,

      status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: "ORDERED"
      }
      
    }
    ,{timestamps:true});

export const Order = mongoose.model("Order", orderSchema);