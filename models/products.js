import mongoose from "mongoose";
const productsSchema=new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    rating: {
      rate:{
        type:Number,
        required:true
    },
      count: {
        type:Number,
        required:true
    }
    },
    image:{
        type:String,
        default:"images/defaultProfile.png"
    }
})
export const Products=mongoose.model("Product",productsSchema)