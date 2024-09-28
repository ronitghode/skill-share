import React, { useState, useEffect } from 'react';
import SwipeButtons from '../components/SwipeButtons'; // Swipe buttons component
import axios from 'axios'; // For making HTTP requests

const Home = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [usersData, setUsersData] = useState([]); // State for users
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUsersData(response.data); // Set fetched user data
        setLoading(false);           // Stop loading
      } catch (err) {
        setError('Failed to load users.'); // Handle error
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle swipe right
  const handleSwipeRight = () => {
    setCurrentUserIndex((prevIndex) =>
      prevIndex === usersData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle swipe left
  const handleSwipeLeft = () => {
    setCurrentUserIndex((prevIndex) =>
      prevIndex === 0 ? usersData.length - 1 : prevIndex - 1
    );
  };

  // Handle like action
  const handleLike = () => {
    console.log('User liked');
    handleSwipeRight();
  };

  // Handle dislike action
  const handleDislike = () => {
    console.log('User disliked');
    handleSwipeRight();
  };

  // If still loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // If no users found
  if (usersData.length === 0) {
    return <p>No users available.</p>;
  }

  const currentUser = usersData[currentUserIndex];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gradient animate__animated animate__fadeIn">Skill Share</h1>
      <p className="text-xl mb-12 text-center animate__animated animate__fadeIn animate__delay-1s">Swipe to find people with amazing skills and interests!</p>

      {/* Card for user info */}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl relative animate__animated animate__zoomIn">
        <div className="flex flex-col items-center">
          {currentUser.isActive && (
            <span className="absolute top-0 right-0 bg-green-500 text-white py-1 px-3 rounded-bl-lg text-sm animate__animated animate__bounceIn animate__delay-2s">
              Recently Active
            </span>
          )}
          
          <img
  src={currentUser.profileImage} // Corrected field for profile image
  alt={currentUser.name}
  className="w-32 h-32 rounded-full mb-4 transform transition-transform duration-300 hover:scale-110"
/>

          <h2 className="text-3xl font-bold mb-2 animate__animated animate__fadeIn">{currentUser.name}</h2>
          
          {/* Gender of the user */}
          <p className="text-lg mb-2 text-center animate__animated animate__fadeIn">{currentUser.gender}</p>  {/* Displaying gender */}

          {/* Bio of the user */}
          <p className="text-lg mb-4 text-center animate__animated animate__fadeIn animate__delay-1s">{currentUser.bio}</p>

          {/* Skills of the user */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {currentUser.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-white text-gray-800 py-2 px-4 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-4 animate__animated animate__fadeIn animate__delay-3s">
        <SwipeButtons
          onLike={handleLike}
          onDislike={handleDislike}
          showNextUser={handleSwipeRight}
        />
      </div>
    </div>
  );
};

export default Home;
