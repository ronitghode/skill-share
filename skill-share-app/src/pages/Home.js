import React, { useState, useEffect } from 'react';
import SwipeButtons from '../components/SwipeButtons';
import axios from 'axios';

const Home = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [matchNotification, setMatchNotification] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSwipeRight = () => {
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeLeft = () => {
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };

  const handleLike = async () => {
    if (isLiking || currentUserIndex >= usersData.length) return;

    const currentUser = usersData[currentUserIndex];
    setIsLiking(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5005/api/users/like/${currentUser._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isMatch) {
        setMatchNotification(response.data.matchedUser);
        setTimeout(() => setMatchNotification(null), 3000);
      }

      handleSwipeRight();
    } catch (error) {
      console.error('Error liking user:', error);
      handleSwipeRight();
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = () => {
    handleSwipeRight();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 font-semibold">Finding amazing people...</p>
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

  if (usersData.length === 0 || currentUserIndex >= usersData.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            No More Profiles
          </h1>
          <p className="text-xl text-purple-200 mb-8">You've seen everyone! Check back later for new users.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/50"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const currentUser = usersData[currentUserIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* Match Notification */}
      {matchNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 rounded-full shadow-2xl shadow-green-500/50 text-center">
            <p className="text-white font-bold text-lg">💕 It's a match with {matchNotification.name}!</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            Find Your Match
          </h1>
          <p className="text-center text-purple-200">Discover amazing people to collaborate with</p>
        </div>

        {currentUser && (
          <div className="w-full max-w-md">
            {/* User Card */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 transform transition-all duration-300 hover:shadow-3xl hover:shadow-pink-500/30 mb-8">
              {/* Profile Image */}
              <div className="relative h-96 bg-gradient-to-b from-purple-600 to-pink-600 overflow-hidden">
                {currentUser.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>

              {/* User Info */}
              <div className="p-6 relative -mt-20 z-10">
                <h2 className="text-4xl font-bold mb-2">{currentUser.name}</h2>
                <p className="text-purple-200 text-sm mb-4">Ready to connect</p>

                {currentUser.bio && (
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{currentUser.bio}</p>
                )}

                {currentUser.skills && currentUser.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swipe Buttons */}
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={handleDislike}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50"
              >
                ❌
              </button>
              <button
                onClick={handleLike}
                disabled={isLiking}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 disabled:opacity-50"
              >
                ❤️
              </button>
            </div>

            <p className="text-center text-purple-300 text-sm mt-8">Swipe left to pass, right to like</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
