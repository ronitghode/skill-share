const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  gender: {
    type: String, // 'Male', 'Female', 'Non-binary', or other values
    enum: ['Male', 'Female', 'Non-binary', 'Other']
  },
  bio: {
    type: String, // User bio or description
    maxlength: 500, // Optional: restrict the length of the bio
  },
  profileImage: {
    type: String, // URL or path to the profile image
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References to other users (matches)
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
