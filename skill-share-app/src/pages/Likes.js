import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/api/users/likes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load likes.');
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 font-semibold">Loading people who liked you...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            People Who Liked You ❤️
          </h1>
          <p className="text-purple-200">See who's interested in connecting with you</p>
        </div>

        {/* Content */}
        {likes.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center max-w-md">
              <div className="text-7xl mb-6 animate-bounce">💔</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                No Likes Yet
              </h2>
              <p className="text-purple-200 text-lg mb-8">No one has liked you yet, but they will soon! Keep swiping to get discovered.</p>

              <div className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm mb-8">
                <p className="text-gray-300 text-sm">💡 Tip: Complete your profile and add great skills to increase your chances of getting liked!</p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/50"
              >
                Start Swiping 👉
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likes.map((user) => (
              <div
                key={user._id}
                className="group relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {/* Card Background */}
                <div className="relative h-80 bg-gradient-to-b from-purple-600 to-pink-600 overflow-hidden">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                  {/* Like Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span>❤️</span>
                      <span>Liked You</span>
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 relative -mt-16 z-10 backdrop-blur-sm bg-gray-900/80">
                  <h3 className="text-2xl font-bold mb-2">{user.name}</h3>

                  {user.gender && (
                    <p className="text-purple-300 text-sm mb-3">Gender: {user.gender}</p>
                  )}

                  {user.bio && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.bio}</p>
                  )}

                  {user.skills && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {user.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                      {user.skills.length > 3 && (
                        <span className="text-purple-300 text-xs">+{user.skills.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => navigate('/matches')}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>❤️</span>
                    <span>View in Matches</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Likes;