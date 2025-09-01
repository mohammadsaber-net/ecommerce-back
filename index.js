import express from 'express'
import dotenv  from 'dotenv'
import mongoose from 'mongoose'
import router from './routers/products-routes.js'
import userRouter from './routers/users-routes.js'
import path from "path";
import helmet from 'helmet'
import cors from "cors"
import { fileURLToPath } from "url";
import values from './utilites/values.js'
const app = express()
app.use(helmet())
app.disable("x-powered-by");
const allowedOrigins = ['https://mohammadsaber-net.github.io','http://localhost:3000'];
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
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config()
const url= process.env.DATABASE_URL
let connection=mongoose.connect(url)
connection.then(()=>{
    console.log("connection to database has established")
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images",express.static(path.join(__dirname,"images")))

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