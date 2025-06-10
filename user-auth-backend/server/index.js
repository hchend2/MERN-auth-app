const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/route');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true}, ()=> {
    console.log('Connected to MongoDB');  
});


// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});