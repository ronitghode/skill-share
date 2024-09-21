import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import { registerUser } from '../utils/api';
const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', skills: '' });
  const navigate = useNavigate(); // To redirect the user

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, skills } = formData;
      const skillsArray = skills.split(',').map(skill => skill.trim()); // Convert skills string to array
      const response = await registerUser(email, password, name, skillsArray);
      const data = await response;

      if (data.message === "User registered successfully") {
        alert('Sign up successful!');
        navigate('/signin'); 
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full py-3 pl-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full py-3 pl-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full py-3 pl-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="Skills (e.g., JavaScript, React)"
            className="w-full py-3 pl-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Already have an account? <a href="/signin" className="text-blue-400 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
