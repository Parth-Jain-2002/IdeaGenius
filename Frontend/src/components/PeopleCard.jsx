// PeopleCard.jsx

import React from "react";

const PeopleCard = ({ name, jobTitle, jobDescription, institution }) => {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const url = `https://source.unsplash.com/150x150/?user&${randomSeed}`;
  return (
    <div className="relative transition-transform rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:-translate-y-1 h-full">
      <div className="relative h-36">
        <img
          className="w-full h-24 object-cover"
          src={url}
          alt={`Bannere of ${name}`}
        />
        <img
          className="w-24 h-24 rounded-full ml-6 object-cover relative -top-12 border-4 border-white"
          src={url}
          alt={`Profile of ${name}`}
        />
      </div>
      <div className="px-6 py-4 mb-4">
        <div className="flex flex-row justify-between">
          <span className="font-bold text-xl">{name}</span>
          <button className="group border border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white px-3 rounded-full leading-loose flex flex-row justify-center items-center">
            <svg
              width="24"
              height="24"
              fillRule="evenodd"
              clipRule="evenodd"
              className="group-hover:inline-block hidden fill-white mr-1 scale-75"
            >
              <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
            </svg>
            Connect
          </button>
        </div>
        <p className="text-gray-700">{jobTitle}</p>
        <p className="text-gray-600 font-light my-3">{jobDescription}</p>
        <a href="#" className="text-blue-700">
          <svg
            width="24"
            height="24"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-blue-700 mr-1 scale-75"
          >
            <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
          </svg>{" "}
          Trumio Profile
        </a>
        <p className="text-gray-400">
          <svg
            width="24"
            height="24"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-gray-400 mr-1 scale-75"
          >
            <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
          </svg>{" "}
          {institution}
        </p>
      </div>
    </div>
  );
};

PeopleCard.Small = ({ name, jobTitle }) => {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;
  const url = `https://source.unsplash.com/150x150/?user&${randomSeed}`;
  return (
    <div className="relative rounded-xl overflow-hidden hover:scale-105 ">
      <div className="p-2 flex-row flex  ">
        <img
          className="w-14 h-14 mx-2 rounded-full object-cover border-4 border-white"
          src={url}
          alt={`Profile of ${name}`}
        />
        <div className="flex flex-1 flex-col justify-between">
          <span className="font-semibold text-lg">{name}</span>
          <span className="text-gray-700 text-sm">{jobTitle}</span>
          <button className="group border bg-[#efefef] border-gray-500 hover:bg-gray-700  hover:text-white px-3 rounded-full text-sm leading-loose flex flex-row justify-center items-center mt-2">
            <svg
              width="24"
              height="24"
              fillRule="evenodd"
              clipRule="evenodd"
              className="group-hover:inline-block hidden fill-white mr-1 scale-75"
            >
              <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
            </svg>
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
