import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import userRouter from "./routes/user.routers.js";
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

app.use(express.json());

app.use(cookieParser());

// Add your routes here
app.use('/api/v1/users', userRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



