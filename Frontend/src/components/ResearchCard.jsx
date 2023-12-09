import React, { useState } from "react";
import { Link } from "react-router-dom"; 

import three_dots from "../assets/images/three_dot_icon.png";
import EditFormChat from "./modals/EditFormChat";

/**
 * A component to display a research card, which contains the details of a knowledge resource like an article
 * @param {{imgSrc: string, title: string, url: string, chatid: string, topics: Array<string>, currentTopic: string, getThreads: function}} props Details of the research card
 * @returns {React.Component} The research card component
 */
export default function ResearchCard({ imgSrc, title, url, chatid, topics, currentTopic, getThreads}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * A function to open the Edit Topic modal
   */
  function openModal() {
    setIsModalOpen(true);
  };

  /**
   * A function to close the Edit Topic modal
   */
  function closeModal() {
    setIsModalOpen(false);
  };

  /**
   * A function to convert the text to a shorter version
   * @param {string} text The text to convert
   * @returns The converted string
   */
  function parseText(text) {
    return text.length > 40 ? text.slice(0, 40) + "..." : text;
  }
  
  /**
   * A function to convert the url to a shorter version
   * @param {string} url The url to convert 
   * @returns The converted url
   */
  function parseUrl(url) {
    // Remove http:// or https://
    url = url.replace(/(^\w+:|^)\/\//, "");
    // Remove text after first /
    url = url.split("/")[0];
    return url.length > 40 ? url.slice(0, 40) + "..." : url;
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
      <h3
        className="text-lg font-medium mt-2 text-center"
        onMouseLeave={(e) => (e.target.innerText = parseText(title))}
      >
        {parseText(title)}
      </h3>
      <Link
        className="inline-block font-light mt-4 text-sm text-center"
        to={url}
      >
        {parseUrl(url)}
      </Link>
      <div className="absolute bottom-3 right-3 flex">
        <Link to={`../chat/${chatid}`}>
          <IconResearch />
        </Link>
        <img
          src={three_dots}
          alt="Three dots icon"
          className="h-6 w-6 ml-2 p-1 rounded-full hover:bg-gray-200"
          onClick={openModal}
        />
        {isModalOpen && (
          <EditFormChat
            onClose={closeModal}
            topics={Object.keys(topics)}
            currentTopic={currentTopic}
            chatId={chatid}
            getThreads={getThreads}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Research SVG Icon
 * @returns {React.Component} svg icon
 */
function IconResearch() {
  return (
    <svg
      className="h-6 w-6 p-1 rounded-full hover:bg-gray-200"
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
  );
}
