import express from 'express'
import user from '../logic/user.js'
import { upload } from '../uploadImages.js'
import { loginValidtion, registerValidtion } from '../validations/userValidation.js'
import { allowedTo, handlejwt } from '../middelwares/catchLogicMistakes.js'
import values from '../utilites/values.js'
const userRouter=express.Router()
userRouter.route("/")
                .get(handlejwt,allowedTo(values.ADMIN),user.getUsers)
userRouter.post("/register",upload.single("avatar"),registerValidtion,user.register)
userRouter.post("/login",loginValidtion,user.login)
export default userRouter