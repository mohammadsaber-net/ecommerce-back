import values from "../utilites/values.js"
import jwt from "jsonwebtoken"
export const catchMistakes=(catchError)=>{
    return(req,res,next)=>{
        catchError(req,res,next).catch(err=>{
            next(err)
        })
    }
}
export const handleError=(massege,value,status,next)=>{
    let error=new Error()
    error.message=massege
    error.httpError=value
    error.status=status
    next(error)
}
export const handlejwt=(req,res,next)=>{
    let authHeader=req.headers["Authorization"]||req.headers["authorization"]
   if(!authHeader){
    handleError("token is required",values.FAIL,401,next)
   }
   const token=authHeader.split(" ")[1]
   try {
    const currentUser=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.currentUser=currentUser
    next()
   } catch (error) {
    handleError("token is invalid",values.ERROR,401,next)
   }
}
export const allowedTo=(...user)=>{
    return (req,res,next)=>{
        if(!user.includes(req.currentUser.role)){
            handleError("this role is not autherized",values.ERROR,403,next)
        }
        next()
    }
}