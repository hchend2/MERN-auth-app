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
// const dbConnect = process.env.DB_CONNECT || 'mongodb://localhost:27017/user-auth';

//

const dbConnect = process.env.DB_CONNECT || 'mongodb+srv://testDB:mytest0@cluster0.7xhry2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
;

// const mongoose = require('mongoose');
// const uri = "mongodb+srv://testDB:mytest0@cluster0.7xhry2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);





//




// Start the server after connecting to MongoDB
async function startServer() {
    try {
        await mongoose.connect(dbConnect);
        console.log('Connected to MongoDB');
        
        // Start the server only after successful connection to MongoDB
        app.get('/', (req, res) => {
            res.send('Welcome to the User Authentication API');
        });
        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

startServer();
