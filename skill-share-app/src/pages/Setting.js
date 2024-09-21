// src/pages/Settings.js
import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    skills: [],
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-8">Settings</h1>
      <form onSubmit={handleSubmit} className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg">
        <label className="block mb-4">
          <span className="text-lg font-bold">Name:</span>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white rounded-md border-gray-600"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg font-bold">Bio:</span>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 text-white rounded-md border-gray-600"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg font-bold">Skills (comma separated):</span>
          <input
            type="text"
            name="skills"
            value={userData.skills.join(', ')}
            onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(', ') })}
            className="mt-1 block w-full bg-gray-700 text-white rounded-md border-gray-600"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Update Profile
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default Settings;
