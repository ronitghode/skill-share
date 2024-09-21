import React, { useState } from 'react';
import SwipeButtons from './SwipeButtons'; // Import the component

const ParentComponent = () => {
  const [users, setUsers] = useState([/* array of user profiles */]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle like action
  const handleLike = () => {
    console.log("Liked");
    // Logic to handle the 'like' action
  };

  // Handle dislike action
  const handleDislike = () => {
    console.log("Disliked");
    // Logic to handle the 'dislike' action
  };

  // Show next user
  const showNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  return (
    <div>
      {/* Render SwipeButtons and pass the functions as props */}
      <SwipeButtons
        onLike={handleLike}
        onDislike={handleDislike}
        showNextUser={showNextUser}
      />
    </div>
  );
};

export default ParentComponent;
