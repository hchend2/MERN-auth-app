//
// file: user-auth-backend/server/routes/route.js 
//
import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// Register route
router.post('/register', async (req, res) => {
    try {

        const {firstname, lastname, email, password} = req.body;

        const hashedPassword = await bcryptjs.hash(password,10);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        // Save the newUser to the database ...
        await newUser.save();
        console.log("User registered successfully:", newUser);
        res.status(201).json({
            message: "User registered successfully",
        })
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Server error during registration",
        });
    }
});

export default router;