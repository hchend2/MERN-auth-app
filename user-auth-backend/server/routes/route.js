const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


// Register route
router.post('/register', async (req, res) => {
    // Validate the data before creating a user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    // // Validate the user data before saving
    // // Check if all fields are filled and valid

    
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
        return res.status(400).send('All fields are required');
    }
    // Check if the password is at least 8 characters long,
    if (user.password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long');
    }
    // Check if the email is in a valid format,
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
        return res.status(400).send('Invalid email format');
    }
    // Check if the first name and last name contain only letters
    if (!/^[a-zA-Z]+$/.test(user.firstname) || !/^[a-zA-Z]+$/.test(user.lastname)) {
        return res.status(400).send('First name and last name must contain only letters');
    }

    // If all validations pass, save the user to the database
    // and return the user ID
    // If there's an error, send a 400 status code
    // and the error message
    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login route
router.post('/login', async (req, res) => {
    // Validate the data before logging in
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong');

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password is wrong');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;

