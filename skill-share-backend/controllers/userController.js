const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model if needed

// Register User
// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, skills } = req.body;

  // Log received data
  console.log('Received registration request:', { name, email, skills });

  // Validate required fields
  if (!name || !email || !password || !skills) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, skills });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};


// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { bio, gender, username, skillsArray, profileImage } = req.body;

  try {
    const updatedFields = {};

    if (bio) updatedFields.bio = bio;
    if (gender) updatedFields.gender = gender;
    if (username) updatedFields.username = username;
    if (skillsArray) updatedFields.skills = skillsArray;

    // If an image file is uploaded in base64 format
    if (profileImage) {
      updatedFields.profileImage = profileImage; // Update profileImage field with the base64 string
    }

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true, runValidators: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Matches
exports.getUserMatches = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using middleware to set req.user
    const user = await User.findById(userId).populate('matches'); // Populate matched users

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.matches); // Return matched users
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Users Who Liked Current User
exports.getUserLikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const usersWhoLiked = await User.find({ likes: userId }).select('-password -likes -matches');

    res.status(200).json(usersWhoLiked);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like a user and check for mutual match
exports.likeUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { likedUserId } = req.params;

    // Validate
    if (currentUserId === likedUserId) {
      return res.status(400).json({ message: 'Cannot like yourself' });
    }

    const currentUser = await User.findById(currentUserId);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    // Check if already liked
    if (currentUser.likes && currentUser.likes.includes(likedUserId)) {
      return res.status(400).json({ message: 'Already liked this user' });
    }

    // Check if already matched
    if (currentUser.matches && currentUser.matches.includes(likedUserId)) {
      return res.status(400).json({ message: 'Already matched with this user' });
    }

    // Add to current user's likes
    if (!currentUser.likes) {
      currentUser.likes = [];
    }
    currentUser.likes.push(likedUserId);
    await currentUser.save();

    // Check for mutual match
    if (likedUser.likes && likedUser.likes.includes(currentUserId)) {
      // Mutual match! Add to both users' matches
      if (!currentUser.matches) {
        currentUser.matches = [];
      }
      if (!likedUser.matches) {
        likedUser.matches = [];
      }

      currentUser.matches.push(likedUserId);
      likedUser.matches.push(currentUserId);

      await currentUser.save();
      await likedUser.save();

      return res.status(200).json({
        message: 'Match created!',
        isMatch: true,
        matchedUser: {
          _id: likedUser._id,
          name: likedUser.name,
          profileImage: likedUser.profileImage,
          bio: likedUser.bio
        }
      });
    }

    res.status(200).json({ message: 'User liked', isMatch: false });
  } catch (error) {
    console.error('Error liking user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Users (exclude current user, already liked, and matched users) (exclude current user, already liked, and matched users)
exports.getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get IDs to exclude (current user, already liked, and matched users)
    const excludeIds = [
      currentUserId,
      ...(currentUser.likes || []),
      ...(currentUser.matches || [])
    ];

    const users = await User.find({
      _id: { $nin: excludeIds }
    }).select('-password');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
