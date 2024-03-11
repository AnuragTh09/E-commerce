import mongoose, { Schema } from "mongoose";

const productSchema = new Schema( 
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
            maxLength: [50, "Product should be at least 50 characters"]
        },
        
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
            maxLength: [7, "Product should be at least 7 characters"]
        },

        description: {
            type: String,

        },

        photos: [
            {
                secure_url: {
                    type: String,
                    required: true,
                }
            }
        ],

        stock: {
            type: Number,
            default: 0,
         },

         sold: {
            type: Number,
            default: 0,
         },

         collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
         }

    } , {timestamps: true});

export const Product = mongoose.model("Product", productSchema);