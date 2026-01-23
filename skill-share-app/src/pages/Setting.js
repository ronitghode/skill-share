import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    skills: [],
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          name: response.data.name || '',
          bio: response.data.bio || '',
          skills: response.data.skills || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5005/api/users/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Profile updated successfully! ✨');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-purple-200">Update your profile information</p>
        </div>

        {/* Settings Card */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl shadow-purple-500/30 p-8 border border-purple-400/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`p-4 rounded-lg text-center font-semibold ${
                message.includes('successfully') 
                  ? 'bg-green-500/20 border border-green-500/50 text-green-200' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <span className="flex items-center gap-2">
                  <span>👤</span>
                  <span>Full Name</span>
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                required
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <span className="flex items-center gap-2">
                  <span>📝</span>
                  <span>Bio</span>
                </span>
              </label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all resize-none"
                required
              />
            </div>

            {/* Skills Field */}
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-3">
                <span className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Skills (comma separated)</span>
                </span>
              </label>
              <input
                type="text"
                name="skills"
                value={userData.skills.join(', ')}
                onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                placeholder="JavaScript, React, Python, Design..."
                className="w-full bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                required
              />
              <p className="text-xs text-purple-300 mt-2">💡 Tip: Add skills that best describe your expertise</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 mt-8 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 border-t border-gray-600"></div>

          {/* Current Skills Preview */}
          {userData.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-purple-200 mb-4">Your Skills Preview</h3>
              <div className="flex flex-wrap gap-3">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-110 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm text-center">
          <p className="text-purple-200 text-sm">✨ Your profile helps others understand your expertise and find you as a potential collaborator!</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
