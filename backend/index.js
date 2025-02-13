import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import userRouter from "./routes/user.routers.js";
import connectDB from "./db/connectionDB.js";
dotenv.config({
    path: './.env'
})

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"]
}));

app.use([express.json(),express.urlencoded({extended:true})]);

app.use(cookieParser());

// Add your routes here
app.use('/api/v1/users', userRouter);
const PORT = process.env.PORT || 3000;
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`apps running on ${process.env.PORT}`);
    }) 
}).catch((err)=>{
    console.log(`db connenction error is ${err}`);

})



