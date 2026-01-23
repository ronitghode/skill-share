import React, { useState } from 'react';
import { loginUser } from '../utils/api';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = formData;
      const response = await loginUser(email, password);
      
      if (response.token) {
        window.location.href = '/home';
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User already exists. Redirecting to Sign Up...');
        setTimeout(() => {
          window.location.href = '/signup';
        }, 2000);
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💕</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            SkillShare
          </h1>
          <p className="text-purple-200">Welcome back! Sign in to your account</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-8 rounded-3xl shadow-2xl shadow-purple-500/30 border border-purple-400/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <span>🔐</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Sign Up Here
            </a>
          </p>
        </div>

        {/* Feature Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm text-center">
          <p className="text-purple-200 text-sm">🚀 Join thousands of people finding meaningful connections through skill sharing!</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
