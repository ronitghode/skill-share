// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserMatches,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// User login route
router.post('/login', loginUser);

// User registration route
router.post('/signup', registerUser);

// Protected route to get user profile
router.get('/profile', authMiddleware, getUserProfile);
router.put('/update-profile', authMiddleware, updateUserProfile);

router.get('/matches', authMiddleware, getUserMatches);

// Other routes...
module.exports = router;
