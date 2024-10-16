// Load environment variables from .env file (e.g., MONGO_URI, PORT)
require('dotenv').config();

// Import necessary modules
const express = require('express');           // Express for building the server
const { MongoClient } = require('mongodb');   // MongoDB client for database connection
const bodyParser = require('body-parser');    // Body-parser to parse incoming request bodies
const cors = require('cors');                 // CORS middleware to allow cross-origin requests

// Initialize the Express application
const app = express();

// Import route files for listings and bookings
const listingsRoutes = require('./routes/listings');
const bookingsRoutes = require('./routes/bookings');

// Define the port from the .env file or default to 5000
const PORT = process.env.PORT || 5000;
// MongoDB URI is stored in .env file (for secure access)
const mongoURI = process.env.MONGO_URI;

let db;  // This will hold the database connection

// Middleware setup
app.use(cors());                  // Enable CORS to allow requests from different domains
app.use(bodyParser.json());        // Enable JSON parsing for incoming requests

// Connect to MongoDB using the URI from the environment variables
MongoClient.connect(mongoURI)
  .then(client => {
    console.log('Connected to MongoDB');      // Log successful connection to MongoDB
    db = client.db('sample_airbnb');          // Connect to the 'sample_airbnb' database

    // Make the MongoDB instance accessible in all routes through `app.locals`
    app.locals.db = db;  // This allows routes to access the database via `req.app.locals.db`
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));  // Log any connection errors

// Mount the listings and bookings routes under the /api endpoint
app.use('/api/listings', listingsRoutes);   // Route for handling listing-related requests
app.use('/api/bookings', bookingsRoutes);   // Route for handling booking-related requests

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);   // Log a message when the server is up and running
});
