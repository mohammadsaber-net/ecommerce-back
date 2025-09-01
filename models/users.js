import mongoose from "mongoose";
import values from "../utilites/values.js";
const userEschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[values.CUSTOMER,values.ADMIN],
        default:values.CUSTOMER
    },
    token:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"images/defaultProfile.png"
    }
})
export const Users=mongoose.model("StoreUser",userEschema)