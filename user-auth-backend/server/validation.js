
// user-auth-backend/server/validation.js
// This file contains the validation logic for user registration and login using Joi

const mongoose = require('mongoose');
// Importing Joi for validation
const Joi = require('joi');
// Importing the User model
const User = require('./models/User');
// Importing dotenv to manage environment variables
require('dotenv').config();

// Validation functions for user registration and login
const registerValidation = (data) => {
    // const Joi = require('joi');
    const schema = Joi.object({
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
}
const loginValidation = (data) => {
    // const Joi = require('joi');

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
}

module.exports = {
  registerValidation,
  loginValidation
};