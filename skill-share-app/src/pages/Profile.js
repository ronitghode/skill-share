import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
    navigate('/edit-profile'); // Navigate to the edit profile page
  };

  if (loading) {
    return <p>Loading...</p>; // Consider adding a spinner here
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userData) {
    return <p>User profile not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8">Profile</h1>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-800 p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="relative mb-6">
          <img
            src={userData.profileImage || 'path/to/default/image.jpg'} // Default image path
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gradient-to-tr from-purple-400 to-pink-500"
          />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center">{userData.name}</h2>
        <p className="text-lg mb-4 text-center">{userData.bio}</p>
        <p className="text-lg mb-4 text-center">{userData.gender || 'Gender not specified'}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {userData.skills?.map((skill, index) => (
            <span key={index} className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:scale-110 transition-transform">
              {skill}
            </span>
          ))}
        </div>
        <button
          onClick={handleEditProfile}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 mb-4"
        >
          Complete Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
