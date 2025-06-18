//
// user-auth-backend/server/server.js
//
import express from 'express';
import connectToDB from './config/db.js';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB
const dbConnect_PORT = process.env.DB_CONNECT || 'mongodb://localhost:27017/usersdb';
mongoose.connect(dbConnect_PORT)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the User Authentication API');
});

// Register route
app.post('/api/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send('All fields are required');
    }
    // Check if the email already exists in the database
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send('Email already exists');
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    //jwt token generation
    // If the user is created successfully, generate a JWT token
    // and set it as a cookie in the response
    if (user) {
      const auth_token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
      });

      res.cookie("auth_token", auth_token, { // Set the cookie with the JWT token
        httpOnly: true, // Prevent JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
      });
    }
    // Save the user to the database
    await user.save();
    return res.status(201).send({ user: user._id, message: "User created Successfully!" });

  } catch (error) { // Handle any errors that occur during registration
    return res.status(400).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
