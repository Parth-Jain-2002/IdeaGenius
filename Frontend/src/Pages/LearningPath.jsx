import axios from "axios";
import React, { useState, useEffect } from "react";
import chatIcon from "../assets/images/chat_icon.png";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LearningPath() {
    const { ideaid } = useParams();
    const [loading, setLoading] = useState(true);
    const [topicDetails, setTopicDetails] = useState([]);
    const topicid = ideaid;
    const navigate = useNavigate();
    function getTopicDetails() {
        axios
          .get(`http://localhost:8000/get_topic`, {
            params: {
              userid: localStorage.getItem("ideagen_user_id"),
              topicid: topicid,
            },
          })
          .then(
            (response) => {
              console.log("response:", response.data);
              // Check if topicDetails.generated is true before calling the other functions
              const generated = response.data.generated;
            if (generated) {
              getPeeps();
              getInsights();
            }
              setTopicDetails(response.data);
            },
            (error) => {
              console.log(error);
            }
          );
      };

      function getLearningPath() {
        axios
        .post(`http://localhost:8000/generate_learning_path`, {
            userid: localStorage.getItem("ideagen_user_id"),
            ideaid: ideaid,
        })
        .then(
            (response) => {
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }
      function handleIdeaGeneration() {
        navigate(`../idea/${topicid}`);
      }
    useEffect(() => {
        getTopicDetails();
        getLearningPath();
    }, [topicid]);


    useEffect(() => {
        
    }, [ideaid]);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      function capitalizeWords(str) {
        if (!str) {
          return '';
        }
        return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
      };
    
    return (
        <section className="grid h-full text-black xl:grid-cols-5 grid-cols-4">
            <Sidebar />
            <main className="flex h-full flex-col w-full bg-white col-span-4">
                <Navbar />
                <div className="w-full h-full p-8">
                    <div className="flex items-center justify-between px-10 py-4 rounded-3xl border-2 border-sky-200 shadow-lg bg-blue-100">
                        <div className="flex flex-col justify-between w-full items-center md:flex-row">
                            <div className="flex flex-col w-full">
                                <h3 className="text-2xl font-semibold text-center md:text-left">{capitalizeWords(topicid)}</h3>
                                <p className="text-gray-600 text-base w-full text-center md:text-left p-1">
                                    {capitalizeWords(topicDetails.description)}
                                </p>
                            </div>
                            <div className="items-center hover:bg-blue-300 flex flex-row bg-white px-2 rounded-lg w-96 max-w-full justify-center">
                                {" "}
                                <img src={chatIcon} alt="chat icon" className="h-4 w-4 ml-2 " />
                                {topicDetails.generated ? (
                                    <button
                                        onClick={() => {
                                            handleIdeaRefinement();
                                        }}
                                        className="px-2 py-1 font-semibold text-black"
                                    >
                                        Generate Learning Path
                                    </button>
                                ) : (
                                    <button
                                    onClick={() => {
                                      handleIdeaGeneration();
                                    }}
                                    className="px-2 py-2 font-bold text-gray-700 rounded-lg"
                                  >
                                    Generate Idea First
                                  </button>

                                )}

                            </div>
                            <Link to={`../learning-path-generator/${ideaid}`}>GET Learning Path</Link>
                        </div>
                    </div>
                    <div></div>

                </div>
            </main>
        </section>
    )

}