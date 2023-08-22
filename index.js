import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// DB
import connectDB from './db.js';

// Routers
import userRouter from './routes/userRoutes.js';
import planItemRouter from './routes/planItemRoutes.js';
import planRouter from './routes/planRoutes.js';


dotenv.config();

const app = express();

// Global usages
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/plan-item', planItemRouter);
app.use('/api/plan', planRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello from Checkinator\'s powerful server</h1>');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
