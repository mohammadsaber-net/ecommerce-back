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
export const handlejwt = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return handleError("token is required", values.FAIL, 401, next);
  }
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    return handleError("token is invalid", values.ERROR, 401, next);
  }
};
export const allowedTo=(...user)=>{
    return (req,res,next)=>{
        if(!user.includes(req.currentUser.role)){
            handleError("this role is not autherized",values.ERROR,403,next)
        }
        next()
    }
}