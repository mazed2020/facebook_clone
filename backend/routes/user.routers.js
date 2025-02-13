import express from "express";
import {userRegistration, login, logOut } from "../controllers/user.controller.js";
import { createPost } from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { multerMiddleware } from "../utils/cloudinary.js";
const router=express.Router();

// Endpoint to fetch all users

router.post('/register',userRegistration);
router.get('/login',login);
router.get('/logOut',logOut);

//post router here
router.post('/createPost',authMiddleware,multerMiddleware.single('media') ,createPost);

export default router;