import React from 'react';

const UserCard = ({ name, skills, interests, onLike, onDislike }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{name}</h2>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Skills:</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Interests:</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600" 
          onClick={onLike}
        >
          Like
        </button>
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" 
          onClick={onDislike}
        >
          Dislike
        </button>
      </div>
    </div>
  );
};

export default UserCard;
