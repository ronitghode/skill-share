import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/api/users/matches', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleChat = (matchId, matchName) => {
    navigate(`/chat/${matchId}`, { state: { matchName } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 font-semibold">Loading your matches...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center py-12 px-4">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
        
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-7xl float-animation">😊</div>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Your Matches 💕
          </h1>
          <p className="text-xl text-purple-200 mb-8">No matches yet, but keep swiping!</p>

          <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm">
            <p className="text-gray-300 text-sm">💡 Keep swiping on the Home page to find your perfect match and start chatting!</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/50"
          >
            Start Swiping 👉
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            Your Matches ✨
          </h1>
          <p className="text-purple-200">Connect and chat with people you like</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match._id}
              className="group relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {/* Card Background */}
              <div className="relative h-80 bg-gradient-to-b from-purple-600 to-pink-600 overflow-hidden">
                {match.profileImage ? (
                  <img
                    src={match.profileImage}
                    alt={match.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              {/* Card Info */}
              <div className="p-6 relative -mt-16 z-10 backdrop-blur-sm bg-gray-900/80">
                <h3 className="text-2xl font-bold mb-2">{match.name}</h3>
                
                {match.bio && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{match.bio}</p>
                )}

                {match.skills && match.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {match.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                    {match.skills.length > 3 && (
                      <span className="text-purple-300 text-xs">+{match.skills.length - 3} more</span>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleChat(match._id, match.name)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>Start Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
