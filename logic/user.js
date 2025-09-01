import {validationResult } from "express-validator";
import { catchMistakes, handleError } from "../middelwares/catchLogicMistakes.js";
import { Users } from "../models/users.js";
import values from "../utilites/values.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const getUsers=catchMistakes(
    async(req,res,next)=>{
        const users=await Users.find()
        if(users.length<=0){
            handleError("there's no users yet",values.FAIL,404,next)
        }
        res.status(200).json({
            status:values.SUCCESS,
            body:{
                users
            }
        })
    }
)
const register=catchMistakes(
    async(req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return handleError(errors.array(),values.FAIL,400,next)
        }
        let {name,email,phone,password,role}=req.body
        const oldEmail=await Users.findOne({"email":email})
        if(oldEmail){
            return handleError("this email is already used",values.FAIL,400,next)
        }
        password=await bcrypt.hash(password,8)
        let user=new Users({name,email,phone,password,role,avatar:req.file.filename})
        const token=jwt.sign({email:email,id:user._id,role:role},process.env.JWT_SECRET_KEY,{expiresIn:"90MIN"})
        user.token=token
        await user.save()
        res.status(201).json({
            status:values.SUCCESS,
            body:{
                user
            }
        })
    }
)
const login=catchMistakes(
    async(req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return handleError(errors.array(),values.FAIL,400,next)
        }
        const {email,password}=req.body
        const oldEmail=await Users.findOne({"email":email})
        if(!oldEmail){
            return handleError("email is not available",values.FAIL,404,next)
        }
        const matchPassword=bcrypt.compareSync(password, oldEmail.password)
        if(!matchPassword){
            return handleError("password is incorrect",values.FAIL,404,next)
        }
        const token=jwt.sign({email:email,id:oldEmail._id,role:oldEmail.role},process.env.JWT_SECRET_KEY,{expiresIn:"90MIN"})
        oldEmail.token=token
        res.status(201).json({
            status:values.SUCCESS,
            body:{
                oldEmail
            }
        })
    }
)
export default {getUsers,register,login}