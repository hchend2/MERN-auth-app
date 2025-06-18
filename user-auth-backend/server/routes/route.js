import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model defined in models/user.js
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// // Register route
// router.post('/api/register', async (req, res) => {
//     // Validate the data before creating a user
//     const {firstname, lastname, email, password} = req.body;
//     // // //
//     try {
//         if (!firstname || !lastname || !email || !password) {
//             return res.status(400).send('All fields are required');
//         }
//         // make sure that the email is unique ... 
//         const emailExists = await User.findOne({email});
//         if (emailExists) {
//             return res.status(400).send('Email already exists');
//         }
//         //
//         const hashedPassword = await bcryptjs.hash(password, 10);
//         // Create a new user instance
//         const user = new User({
//             firstname,
//             lastname,
//             email,
//             password: hashedPassword
//         });
//         // jwt cookies  ...
//         // JWT__SECRET is defined in .env file
//         // exemple fo JWT_SECRET: jh43iuh4354hhs!klljj/sdf\452sseer
//         if (user) {
//             const auth_token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,
//             {
//                 expiresIn: '10d',

//             });
//                 res.cookie("auth_token", auth_token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//                 sameSite: 'strict', // Prevent CSRF attacks
//                 maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
//             });
//         } 
//         // Save the user to the database
//         await user.save();
//         // Return the user ID and a success message
//         return res.status(201).send({user: user._id, message:"User created Successfully!"});
//         // Validate the user data before saving
//     } catch (error) {
//         return res.status(400).send(error.message);
//     }
// });

// Login route
// router.post('/api/login', async (req, res) => {

//     // Validate the data before logging in
//     const {email, password} = req.body;

//     try {
//         const userIsValid = await User.findOne({email});
//         if (!userIsValid) {
//             return res.status(400).send('Invalid email or password');
//         }
//         const validPassword = await bcrypt.compare(password, userIsValid.password);
//         if (!validPassword) {
//             return res.status(400).send('Invalid email or password');
//         }
//         //jwt
//         if (user) {
//             const auth_token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,
//             {
//                 expiresIn: '10d',
//             });
//             res.cookie("auth_token", auth_token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//             sameSite: 'strict', // Prevent CSRF attacks
//             maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
//         });
//         } 
//     } catch (err) {
//         return res.status(400).send('Invalid email or password');
//     }
// });

export default router;