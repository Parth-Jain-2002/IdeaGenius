import React, { useState } from "react";
import axios from "axios";

import crossIcon from "../../assets/images/cross_icon.png";
import infoIcon from "../../assets/images/info_icon_red.svg";

/**
 * This is the NewIdeaModal modal that allows users to create a new Idea
 * @param {{onClose: function, topics: Array<string>, getTopics: function}} props Properties for the NewIdeaModal component
 * @returns {React.Component} NewIdeaModal modal
 */
export default function NewIdeaModal({ onClose, topics, getTopics }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  /**
   * A function to validate the change in the title of the idea
   * @param {Event} e onChange event of the title input
   */
  function handleTitleChange(e) {
    // Ensure the title does not exceed 25 characters
    if (e.target.value.length <= 25) {
      setError("");
      setTitle(e.target.value);
    }
  };

  /**
   * A function to validate the change in the description of the idea
   * @param {Event} e onChange event of the description input
   */
  function handleDescriptionChange(e) {
    // Ensure the description does not exceed 100 characters
    if (e.target.value.length <= 100) {
      setDescription(e.target.value);
    }
  };

  /**
   * A function to create the new Idea with the given title and description
   */
  function handleCreateIdea() {
    // Check if the title already exists in topics
    if (topics.includes(title)) {
      setError("You have a idea with the same name");
      return;
    }

    axios
      .post(`http://localhost:8000/new_topic`, {
        userid: localStorage.getItem("ideagen_user_id"),
        ideaid: title,
        description: description,
      })
      .then(
        (response) => {
          //console.log(response)
          onClose();
          getTopics();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40 top-0" style={{ marginTop: 0 }}></div>
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded-md shadow-md w-96 z-50">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-left">New Idea</h2>
            <p className="text-gray-500 text-left">Organize your thoughts</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <img src={crossIcon} alt="Close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 text-left">
            Name
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full border rounded-md p-2"
          />
          {error && (
            <div className="text-red-500 text-xs text-left mt-1">
              <img
                src={infoIcon}
                alt="Info"
                className="h-4 w-4 inline-block mr-1"
              />
              {error}
            </div>
          )}
          <div className="flex justify-end text-xs text-gray-500 mt-1">
            <span>{title.length}/25</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 text-left">
            Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full border rounded-md p-2"
          ></textarea>
          <div className="flex justify-end text-xs text-gray-500">
            <span>{description.length}/100</span>
          </div>
        </div>

        <button
          onClick={handleCreateIdea}
          className="bg-gray-300 hover:bg-gray-400 text-white p-2 rounded-full w-full"
          disabled={!title}
        >
          Create
        </button>
      </div>
    </>
  );
};
