import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Replace with your routing library and correct import
import three_dots from "../assets/images/three_dot_icon.png";
import EditFormChat from './modals/EditFormChat';

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

function parseText(text) {
    return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

function parseUrl(url) {
    // Remove http:// or https://
    url = url.replace(/(^\w+:|^)\/\//, "");
    // Remove text after first /
    url = url.split("/")[0];
    return url.length > 40 ? url.slice(0, 40) + "..." : url;
}

const ResearchCard = ({ imgSrc, title, url, chatid, topics, currentTopic, getTopics }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="relative p-4 rounded-lg shadow-lg bg-white mb-1">
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
      <h3 className="text-lg font-medium mt-2 text-center"
        //onMouseEnter={(e) => e.target.innerText = title}
        onMouseLeave={(e) => e.target.innerText = parseText(title)}
      >
        {parseText(title)}</h3>
      <Link className="inline-block font-light mt-4 text-sm text-center" to={url}>
        {parseUrl(url)}
      </Link>
      <div className="absolute bottom-3 right-3 flex">
        {/* Use a suitable Tailwind CSS icon here */}
        <Link to={`../chat/${chatid}`}>
        <IconResearch className="h-6 w-6 p-1 rounded-full hover:bg-gray-200" />
        </Link>
        <img src={three_dots} alt="Three dots icon" className="h-6 w-6 ml-2 p-1 rounded-full hover:bg-gray-200" onClick={openModal}/>
        {isModalOpen && <EditFormChat onClose={closeModal} topics={Object.keys(topics)} currentTopic={currentTopic} chatId={chatid} getTopics={getTopics}/>}
      </div>
    </div>
  );
};

export default ResearchCard;
