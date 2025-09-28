import express from 'express'
import order from '../logic/order.js'
import { allowedTo, handlejwt } from '../middelwares/catchLogicMistakes.js'
import values from '../utilites/values.js'
import { orderValidation } from '../validations/orderValidation.js'
const router=express.Router()
router.get("/purchasement",handlejwt,allowedTo(values.ADMIN),order.getOrders)
router.post("/purchasement",handlejwt,allowedTo(values.ADMIN),order.updateOrders)
router.post("/payment",handlejwt,orderValidation,order.setCash)
export default router