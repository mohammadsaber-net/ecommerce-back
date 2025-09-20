import {validationResult } from "express-validator";
import { catchMistakes, handleError } from "../middelwares/catchLogicMistakes.js";
import values from "../utilites/values.js";
import { Orders } from "../models/order.js";
import {sendEmail} from "../routers/sendEmail.js"
const setCash=catchMistakes(
    async(req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            handleError(errors.array(),values.FAIL,404,next)
        }
        const order=req.body
        const newOrder=new Orders(order)
        await newOrder.save()
        try {
            await sendEmail(
            order.email,
            "تأكيد الطلب",
            `مرحبًا ${order.name || order.email}،
            تم استلام طلبك رقم ${newOrder._id}.
            سيتم التوصيل خلال 48 ساعة.`
        );
           return res.status(200).json({
                status:values.SUCCESS
            })
        } catch (err) {
            console.log(err)
            handleError(err,values.FAIL,400,next)
        }
    }
)
const getOrders=catchMistakes(
    async(req,res,next)=>{
        const orders=await Orders.find()
        if(orders.length<=0){
            handleError("there are no orders yet",values.SUCCESS,200,next)
        }
        res.status(201).json({
            status:values.SUCCESS,
            orders
        })
    }
)
export default {setCash,getOrders}