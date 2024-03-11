import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema( 
{
    name: {
        type: String,
        required: [true, "Please provide a collection name!"], 
        trim: true,
        maxLength: [
            120,
            "Collection name should not exceed 120 characters"
            ]
        },
        
} 
,{timestamps: true})

export const Collection = mongoose.model("Collection", collectionSchema)

