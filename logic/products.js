import { Products } from "../models/products.js"
import { catchMistakes, handleError } from "../middelwares/catchLogicMistakes.js"
import values from "../utilites/values.js"
import { validationResult} from 'express-validator'
const getProducts=catchMistakes(
    async(req,res,next)=>{
    const products=await Products.find()
    if(products.length<=0) {
        handleError("there's no products yet",values.FAIL,404,next)
    }
    res.status(200).json({
        status:values.SUCCESS,
        data:{
            products
        }
    })
})
const getProduct=catchMistakes(
    async(req,res,next)=>{
    const product=await Products.findById(req.params.id)
    if(!product){
        handleError("this product is not available right now",values.FAIL,404,next)
    }
    return res.status(200).json({
        status:values.SUCCESS,
        data:{product}
    })
})
const postProduct=catchMistakes(
    async(req,res,next)=>{
     const errors=validationResult(req)
    if(!errors.isEmpty()){
        handleError(errors.array(),values.FAIL,404,next)
    }
    const newProduct=new Products(req.body)
    newProduct.image=req.file.filename
    await newProduct.save()
    return res.status(201).json({newProduct})
})
const updateProduct= catchMistakes(
    async(req,res,next)=>{
    const id=await Products.findById(req.params.id)
    if(!id){
        handleError("this id is not belong to any product",values.FAIL,400,next)
    }
    const product=await Products.findOneAndUpdate({"_id":req.params.id},{$set:{...req.body}})
    res.status(200).json({
        status:values.SUCCESS,
        body:{
            product
        }
    })
})
const deleteProduct=catchMistakes(
    async(req,res,next)=>{
    let isProduct=await Products.findById(req.params.id)
    if(!isProduct){
        handleError("there's no product with this id",values.FAIL,404,next)
    }
    const product = await Products.findOneAndDelete({"_id":req.params.id})
    return res.status(200).json("product has been deleted")
})
export default {getProducts,getProduct,postProduct,updateProduct,deleteProduct}