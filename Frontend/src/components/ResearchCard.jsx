import React from 'react';
import { Link } from 'react-router-dom'; // Replace with your routing library and correct import

function IconResearch(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }

const ResearchCard = ({ imgSrc, title, url, chatid }) => {
  return (
    <div className="relative p-4 rounded-lg shadow-lg bg-white">
      <img
        alt={title}
        className="mx-auto rounded-lg"
        height="200"
        src={imgSrc}
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
      <h3 className="text-lg font-semibold mt-2 text-center">{title}</h3>
      <Link className="inline-block mt-2 text-center" to={url}>
        {url}
      </Link>
      <div className="absolute bottom-3 right-3">
        {/* Use a suitable Tailwind CSS icon here */}
        <Link to={`../chat/${chatid}`}>
        <IconResearch className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ResearchCard;
