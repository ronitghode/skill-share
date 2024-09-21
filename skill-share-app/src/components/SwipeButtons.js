import React, { useState } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';

const SwipeButtons = ({ onDislike, onLike, showNextUser }) => {
  const [animation, setAnimation] = useState('');

  const handleDislike = () => {
    setAnimation('swipe-left');
    setTimeout(() => {
      onDislike();
      setAnimation('');
      showNextUser();
    }, 500);
  };

  const handleLike = () => {
    setAnimation('swipe-right');
    setTimeout(() => {
      onLike();
      setAnimation('');
      showNextUser();
    }, 500);
  };

  return (
    <div className={`transition-transform duration-500 ${animation}`}>
      <div className="flex justify-around mt-4 space-x-8">
        <button
          onClick={handleDislike}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <button
          onClick={handleLike}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <FaHeart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SwipeButtons;
