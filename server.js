const express = require('express');
const { body } = require('express-validator');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
// Connecting DB
connectDB();



// init Middleware
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 ,// For legacy browser support
    methods: "GET, POST, PATCH, DELETE, PUT"
}

app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.status(200).send('This is MERN WEBLOG!').end();
});

// Define Routes
app.use('/api/posts', require('./routes/api/posts'));

// Listening to server

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`MERN APP listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});