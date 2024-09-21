const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database'); // Ensure you have a db.js file for MongoDB connection
const userRoutes = require('./routes/userRoutes'); // Import user-related routes
const cors = require('cors');
const morgan = require('morgan'); // For logging

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(morgan('dev')); // Logging middleware
app.use(express.json({ limit: '10mb' })); // To parse incoming JSON requests with a size limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // To parse URL-encoded data


// Routes
app.use('/api/users', userRoutes); // This sets up /api/users as the base route for user-related actions

// Root route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
