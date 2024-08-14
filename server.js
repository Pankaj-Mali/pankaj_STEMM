const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const rateLimiter = require('./src/middlewares/rateLimiter');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(rateLimiter);

// Routes
app.use('/api/auth/', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;
