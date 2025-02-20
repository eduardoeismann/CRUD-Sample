const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); // Loading environment variables

const clientRoute = require('../backend/routes/client.route');

// Load environment variables from .env
const { MONGODB_URI, PORT } = process.env;

// Connecting to MongoDB
mongoose.connect('Your Connection String', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database successfully connected!');
})
.catch((error) => {
    console.log('Could not connect to database: ' + error);
});

// Start Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/clients', clientRoute);

const port = PORT || 4000;

// Start server
app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});

// Global error
app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});
