import express from "express"
import dotenv from "dotenv"
import { handleError, handlejwt } from "../middelwares/catchLogicMistakes.js"
import values from "../utilites/values.js"
dotenv.config()
const router =express.Router()
const PAYMOB_API_KEY =process.env.PAYMOB_API_KEY
const INTEGRATION_ID =process.env.INTEGRATION_ID
const IFRAME_ID=process.env.IFRAME_ID
const getAuthToken=async()=>{
    const response=await fetch ("https://accept.paymob.com/api/auth/tokens",{
        method:"post",
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({api_key:PAYMOB_API_KEY})
    })
    const data=await response.json()
    
    return data.token
}
const createOrder=async(authToken,amountCents)=>{
    const response=await fetch("https://accept.paymob.com/api/ecommerce/orders",{
        method:"post",
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({
            auth_token:authToken,
            delivery_needed:false,
            amount_cents:amountCents,
            currency:"EGP",
            items:[]
        })
    })
    const data = await response.json();
    return data.id;
}
const generatePaymentKey=async(authToken,amountCents,orderId,billingData)=>{
    const response =await fetch("https://accept.paymob.com/api/acceptance/payment_keys",{
        method:"post",
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({
            auth_token:authToken,
            amount_cents:amountCents,
            expiration:3600,
            order_id:orderId,
            billing_data:billingData,
            currency:"EGP",
            integration_id:INTEGRATION_ID
        })

    })
    const data = await response.json();
    return data.token;
}
router.post("/pay",handlejwt,async(req,res,next)=>{
    const amount=req.body.amount
    const amountCents = parseInt(amount)
    if (!amountCents || isNaN(amountCents)) {
    handleError("Amount is required and must be a valid integer in cents.",values.FAIL,400,next)
    };
    const billingData={
    apartment: 'NA',
    email: 'test@example.com',
    floor: 'NA',
    first_name: 'Test',
    street: 'NA',
    building: 'NA',
    phone_number: '+201000000000',
    shipping_method: 'NA',
    postal_code: 'NA',
    city: 'Cairo',
    country: 'EG',
    last_name: 'User',
    state: 'Cairo',
  };
  try {
    const authToken=await getAuthToken()
    const orderId=await createOrder(authToken,amountCents)
    const paymentToken=await generatePaymentKey(authToken,amountCents,orderId,billingData)
    const paymentUrl  = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentToken}`;
    res.json({paymentUrl})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Payment failed' });
  }
})
export default router;