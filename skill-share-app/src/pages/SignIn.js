import React, { useState } from 'react';
import { loginUser } from '../utils/api'; // Import the login function

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await loginUser(email, password);
      
      if (response.token) {
        // Redirect to Profile page if login is successful
        window.location.href = '/profile';
      }
    } catch (error) {
      if (error.response && error.response.status === 409) { // Assuming 409 is the "User already exists" status code
        setError('User already exists. Redirecting to Sign Up...');
        // Redirect to Sign Up page after a short delay
        setTimeout(() => {
          window.location.href = '/signup';
        }, 2000);
      } else {
        setError('Failed to login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full py-3 pl-10 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full py-3 pl-10 pr-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
