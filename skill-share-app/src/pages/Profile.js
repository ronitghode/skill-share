import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import defaultImgae from '../data/image.png'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserData(response);
      } catch (error) {
        setError('Error fetching user profile. Please try again later.');
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-bold hover:scale-110 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <p className="text-xl text-purple-200">User profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            Your Profile
          </h1>
          <p className="text-purple-200">Manage your account and settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 p-8">
          {/* Profile Image */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={userData.profileImage || defaultImgae}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center text-lg">
                ✓
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{userData.name}</h2>
            <p className="text-purple-200 mb-4">Status: Active</p>
            {userData.bio && (
              <p className="text-gray-300 text-lg max-w-md mx-auto mb-6">{userData.bio}</p>
            )}
            {userData.gender && (
              <p className="text-purple-300 text-sm mb-6">Gender: {userData.gender}</p>
            )}
          </div>

          {/* Skills */}
          {userData.skills && userData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-center text-purple-200">Skills</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full shadow-lg hover:scale-110 transition-transform text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-8 border-t border-gray-600">
            <button
              onClick={handleEditProfile}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              <span>✏️</span>
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/50 flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm text-center">
          <p className="text-purple-200 text-sm">💡 Update your profile to help others get to know you better!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
