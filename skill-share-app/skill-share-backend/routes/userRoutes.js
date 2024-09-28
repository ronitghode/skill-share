const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserMatches,
  getAllUsers, // Ensure this is imported
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// User login route
router.post('/login', loginUser);

// User registration route
router.post('/signup', registerUser);

// Protected route to get user profile
router.get('/profile', authMiddleware, getUserProfile);
router.put('/update-profile', authMiddleware, updateUserProfile);

// Route to get user matches
router.get('/matches', authMiddleware, getUserMatches);

// Route to get all users
router.get('/', authMiddleware, getAllUsers); // Change this line

module.exports = router;
