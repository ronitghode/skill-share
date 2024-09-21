import React from 'react';

const SkillCard = ({ title, description }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default SkillCard;
