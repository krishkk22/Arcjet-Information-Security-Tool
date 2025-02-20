import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import userRouter from './routes/user.routes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Client IP:", req.ip );
  next();
});
app.use(cookieParser());
app.use(cors());
app.use(arcjetMiddleware);


// Routes
app.use('/api', routes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/subscriptions', subscriptionRouter);
// app.use('/api/v1/workflows', workflowRouter);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});