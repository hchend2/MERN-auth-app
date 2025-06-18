
import mongoose from "mongoose";


async function connectToDB() {
  const dbConnect_PORT = process.env.DB_CONNECT || "mongodb://localhost:27017/usersdb";
    try {
        const connect = await mongoose.connect(dbConnect_PORT);
        console.log("Connected to MongoDB", connect.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
}
export default connectToDB;