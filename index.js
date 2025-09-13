import express from 'express'
import dotenv  from 'dotenv'
import mongoose from 'mongoose'
import router from './routers/products-routes.js'
import userRouter from './routers/users-routes.js'
import path from "path";
import helmet from 'helmet'
import cors from "cors"
// import fs from "fs"
import { fileURLToPath } from "url";
import values from './utilites/values.js'
// import { Products } from './models/products.js'
const app = express()
app.use(helmet())
app.disable("x-powered-by");
const allowedOrigins = ['https://react-ecommerce-mocha-mu.vercel.app','http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
// const products = JSON.parse(fs.readFileSync("./data.json","utf8"))
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config()
const url= process.env.DATABASE_URL
let connection=mongoose.connect(url)
connection.then(async()=>{
  // await Products.deleteMany()
  // await Products.insertMany(products)
    console.log("connection to database has established")
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images",(req,res,next)=>{
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next()
},
express.static(path.join(__dirname,"images")))

app.use("/products",router)
app.use("/user",userRouter)



app.use((req,res,next)=>{
    res.status(404).json("this page is not available")
    return next()
})



app.use((error,req,res,next)=>{
  res.status(error.status || 500).json({
      status:error.httpError || values.ERROR,
      message:error.message,
      data:null
  })
})



app.listen(process.env.PORT || 3000,()=>{
    console.log(`lisening at port: http://localhost:${process.env.PORT || 3000}`)
})