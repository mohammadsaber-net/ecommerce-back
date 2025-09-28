import mongoose from "mongoose";
const orderEschema=new mongoose.Schema({
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
    address:{
        type:Object,
        required:true
    },
    items:{
        type:Object,
        required:true
    },
    typeOfPayment:{
        type:String,
        required:true
    }
    
})
export const Orders=mongoose.model("StoreOrder",orderEschema)