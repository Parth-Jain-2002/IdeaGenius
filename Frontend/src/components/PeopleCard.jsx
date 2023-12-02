// PeopleCard.jsx

import React from 'react';
//import './PeopleCard.css';

const PeopleCard = ({ name, jobTitle }) => {
  // Generate a random number to use as a seed for a random Unsplash user avatar
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const unsplashUrl = `https://source.unsplash.com/50x50/?user&${randomSeed}`;

  return (
    <div className="people-card">
      <div className="avatar">
        <img src={unsplashUrl} alt={`Avatar of ${name}`} />
      </div>
      <div className="info">
        <h3>{name}</h3>
        <p>{jobTitle}</p>
      </div>
      <button onClick={console.log('clicked')}>Add Connection</button>
    </div>
  );
};

export default PeopleCard;
