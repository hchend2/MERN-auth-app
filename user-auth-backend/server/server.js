//
//File: user-auth-backend/server/server.js
//
import express from 'express';
import connectToDB from './config/db.js';
import authRoutes from './routes/route.js'
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // this is the port on which the react front-end runs ...
  credentials: true
}));

app.use(express.json());


app.use('/auth', authRoutes);

connectToDB().then( () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch (err => {
  console.error("Faile to connect to mongoDB:", err)
});

