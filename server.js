const express = require('express');
const { body } = require('express-validator');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// Connecting DB
connectDB();

// init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Define Routes
app.use('/api/posts', require('./routes/api/posts'));

// Listening to server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on PORT ${PORT}!`));
