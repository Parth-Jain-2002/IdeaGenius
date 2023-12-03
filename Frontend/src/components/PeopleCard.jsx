// PeopleCard.jsx

import React from 'react';
//import './PeopleCard.css';

const PeopleCard = ({ name, jobTitle}) => {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const url = `https://source.unsplash.com/150x150/?user&${randomSeed}`;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={url} alt={`Profile of ${name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{jobTitle}</p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect
        </button>
      </div>
    </div>
  );
};

export default PeopleCard;
