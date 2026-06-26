const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');



// Connect to DB (Make sure you have DB_NAME, DB_USER, etc. in your .env!)
connectDB();

const app = express();

app.use(express.json());

// Base API Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));

// Global Error Handler Middleware (MUST be placed after all your routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));