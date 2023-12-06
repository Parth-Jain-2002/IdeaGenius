// NewIdeaModal.js

import React, { useEffect, useState } from "react";
import crossIcon from "../../assets/images/cross_icon.png";
import infoIcon from "../../assets/images/info_icon_red.svg";
import axios from "axios";

const EditFormChat = ({
  onClose,
  topics,
  getThreads,
  currentTopic,
  chatId,
}) => {
  const [topicid, setTopicid] = useState(currentTopic);
  const [title, setTitle] = useState(`Save as ${currentTopic}`);

  const handleChangeTopic = () => {
    // Check if the title already exists in topics
    if (topicid === currentTopic) {
      onClose();
      return;
    }

    axios
      .post(`http://localhost:8000/edit_topic`, {
        userid: localStorage.getItem("ideagen_user_id"),
        chatid: chatId,
        topicid: topicid,
        prevtopicid: currentTopic,
      })
      .then(
        (response) => {
          //console.log(response)
          getThreads();
          onClose();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleTopicId = (value) => {
    setTopicid(value);
    if (value === currentTopic) {
      setTitle(`Save as ${currentTopic}`);
    } else {
      setTitle("Save");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded-md shadow-md w-96 z-50">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-left">Change Idea Bracket</h2>
            <p className="text-gray-500 text-left">
              Organize your thoughts better
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <img src={crossIcon} alt="Close" className="h-4 w-4" />
          </button>
        </div>

        {/* Select with any radiobox */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="topic" className="text-gray-700 text-left">
            Choose a topic
          </label>
          <select
            id="topic"
            className="border border-gray-300 p-2 rounded-lg"
            onChange={(e) => handleTopicId(e.target.value)}
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleChangeTopic}
          className="bg-gray-300 hover:bg-gray-400 text-white p-2 rounded-full w-full mt-4"
          disabled={!title}
        >
          {title}
        </button>
      </div>
    </>
  );
};

export default EditFormChat;
