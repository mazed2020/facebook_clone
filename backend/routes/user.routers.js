import express from "express";

const router=express.Router();

// Endpoint to fetch all users

router.get('/register', (req, res) => {
    res.send("Welcome to the user endpoint");
});

export default router;