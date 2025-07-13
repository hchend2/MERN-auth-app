//
// file: user-auth-backend/server/routes/route.js 
//
import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// POST: Register route ...
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

// POST: login route ...
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const isValidUser = await User.findOne({email});
        if (!isValidUser) {
            return res.status(401).json({message: "Invalid Email or Password"});
        }
        const isValidPassword = await bcryptjs.compare(password, isValidUser.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        // Generate JWT token ...
        const token = jwt.sign(
            {id: isValidUser._id, email: isValidUser.email},
            process.env.JWT_SECRET,
            {expiresIn: '10d'}
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: isValidUser._id,
                firstname:isValidUser.firstname,
                lastname: isValidUser.lastname,
                email: isValidUser.email
            }
        });

    } catch (error) {
        console.error("login failed", error);
        res.status(500).json({
            message: "Server error during login",
        });
    }
});


// Middleware to verify JWT ...
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Get: user info route ...
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;