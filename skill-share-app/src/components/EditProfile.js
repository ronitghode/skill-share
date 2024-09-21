import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    bio: '',
    gender: '',
    skills: '',
    username: '',
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setFormData({
          bio: userData.bio || '',
          gender: userData.gender || '',
          skills: userData.skills ? userData.skills.join(', ') : '',
          username: userData.name || '',
          profileImage: userData.image || null,
        });
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { bio, gender, username, skills ,profileImage} = formData;
      const skillsArray = skills.split(',').map(skill => skill.trim());
      await updateUserProfile({bio, gender, username, skillsArray ,profileImage});
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
            placeholder="Enter your username"
          />
        </div>

        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-900 rounded-md focus:outline-none"
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full mx-auto mt-4"
            />
          )}
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
            rows="4"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Gender Dropdown */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Skills Input */}
        <div className="mb-6">
          <label className="block text-white text-lg mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
            placeholder="Enter your skills separated by commas"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors duration-300"
        >
          Update Profile
        </button>
      </form>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded-lg transition-colors duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default EditProfile;
