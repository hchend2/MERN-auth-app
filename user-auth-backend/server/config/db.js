// 
// File: user-auth-backend/server/config/db.js
// 
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config(); // load environment varible from the .env file ...

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection established successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
}
export default connectToDB;