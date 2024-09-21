import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/matches', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No Matches Found</h1>
          <p className="text-lg mb-6">Looks like you haven't found any matches yet.</p>
          
          {/* Sad Face Animation */}
          <div className="sad-face">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-24 h-24 text-red-400 mx-auto"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 10h.01M15 10h.01M9.5 16s1.5-2 3.5-2 3.5 2 3.5 2"
              />
            </svg>
          </div>

          <p className="text-gray-400 mt-4">Swipe more to find your perfect match!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-8">Your Matches</h1>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        {matches.map((match) => (
          <div key={match._id} className="bg-gray-800 p-6 rounded-xl shadow-lg mb-4">
            <img
              src={match.image}
              alt={match.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">{match.name}</h2>
            <p className="text-lg mb-4">{match.bio}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {match.skills.map((skill, index) => (
                <span key={index} className="bg-white text-gray-800 py-2 px-4 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
