// PeopleCard.jsx

import React from 'react';
//import './PeopleCard.css';

const PeopleCard = ({ name, jobTitle}) => {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const url = `https://source.unsplash.com/150x150/?user&${randomSeed}`;
  return (
    <div className="transition-transform max-w-sm rounded-xl overflow-hidden shadow-lg bg-white text-center hover:shadow-2xl hover:-translate-y-1">
      <img className="w-full h-48 object-cover" src={url} alt={`Profile of ${name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 font-light">{jobTitle}</p>
      </div>
      <div className="px-6 py-4">
        <button className="group border border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white py-2 px-4 rounded-full w-full leading-loose flex flex-row justify-center items-center">
          <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd" className="group-hover:inline-block hidden fill-white mr-2">
            <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/>
          </svg>
          Connect
        </button>
      </div>
    </div>
  );
};

export default PeopleCard;
