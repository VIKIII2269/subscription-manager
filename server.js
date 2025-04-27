const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});