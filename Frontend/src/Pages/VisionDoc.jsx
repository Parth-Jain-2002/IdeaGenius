import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import visionIcon from "../assets/images/vision_icon.png";
import researchIcon from "../assets/images/research_bank_icon.png";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";

export default function VisionDoc() {
  // Destructing the chat id from the url
  const { ideaid } = useParams();

  // State variables
  const [ideaInfo, setIdeaInfo] = useState({});
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState("Start writing here...");
  const [showVisionX, setShowVisionX] = useState(false);

  // Refs for DOM elements
  const containerRef = useRef();
  const messageContainerRef = useRef();
  const visionContainerRef = useRef();
  const message = useRef();
  const customTextRef = useRef();

  // Function to get the chat info
  function getIdeaInfo() {
    //console.log(ideaid);
    axios
      .get(`http://localhost:8000/get_topic`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
          topicid: ideaid,
        },
      })
      .then(
        (response) => {
          //console.log(response);
          setIdeaInfo(response.data);
          setBlock(
            response.data.visiondoctext
              ? response.data.visiondoctext
              : "Start writing here..."
          );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function formatResponse(text, containerRef) {
    const result = [];
    let count = 0;
    const maxCount = containerRef.current
      ? Math.floor(containerRef.current.offsetWidth / 8.5)
      : 40;

    // console.log(maxCount);

    for (let i = 0; i < text.length; i++) {
      result.push(text[i]);
      count++;

      if (text[i] === "\n") {
        count = 0;
      }

      if (count === 1 && text[i] === " ") {
        result.pop();
      }

      // Check if the next word is going to exceed the maxCount
      let temp = text.slice(i + 1).split(" ")[0];
      if (count + temp.length > maxCount) {
        result.push("\n");
        count = 0;
      }

      if (count === maxCount && text[i] !== "\n") {
        result.push("\n");
        count = 0;
      }
    }

    return result.join("");
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChat();
    }
  };

  function handleChat() {
    setLoading(true);
    let message_text = message.current.value;
    message.current.value = ""
    // console.log("Sending message");
    // console.log(message_text);
    axios
      .post(`http://localhost:8000/idea_interface`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
        message: message_text,
      })
      .then(
        (response) => {
          // console.log(response);
          setChats([
            ...chats,
            {
              message: message_text,
              response: response.data.response,
            },
          ]);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  };

  function generateTimeInsights() {
    axios
      .post(`http://localhost:8000/get_time_insights`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
      })
      .then(
        (response) => {
          // console.log(response);
          getIdeaInfo();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function generateCostInsights() {
    axios
      .post(`http://localhost:8000/get_cost_insights`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
      })
      .then(
        (response) => {
          // console.log(response);
          getIdeaInfo();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function generateSimilarInsights() {
    axios
      .post(`http://localhost:8000/get_similar_insights`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
      })
      .then(
        (response) => {
          getIdeaInfo();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function generateSubtasks() {
    axios
      .post(`http://localhost:8000/get_subtasks`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
      })
      .then(
        (response) => {
          // console.log(response);
          getIdeaInfo();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function AddBlock() {
    setBlock(customTextRef.current.innerText + "\n ");
  };

  function SaveData() {
    axios
      .post(`http://localhost:8000/update_topic`, {
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
        title: ideaInfo.title,
        description: ideaInfo.description,
        time_insight: ideaInfo.time_insight,
        cost_insight: ideaInfo.cost_insight,
        subtask: ideaInfo.subtask,
        visiondoctext: ideaInfo.visiondoctext,
        similar_insights: ideaInfo.similar_insights,
      })
      .then(
        (response) => {
          // console.log(response);
          getIdeaInfo();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function scrollToBottom() {
    if(showVisionX || window.innerWidth > 768){
      messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, showVisionX]);

  useEffect(() => {
    getIdeaInfo();

    axios
      .get(`http://localhost:8000/get_idea_chat`, {
        params: {
          ideaid: ideaid,
          userid: localStorage.getItem("ideagen_user_id"),
        },
      })
      .then(
        (response) => {
          // console.log(response);
          setChats(response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 overflow-x-hidden">
      <Navbar link="/dashboard" noBurger={true} />
      <section className="grid grid-cols-4 p-4 h-[90vh] overflow-x-hidden">
        <main className="col-span-4 md:col-span-2 lg:col-span-3 max-h-[78vh] md:max-h-[85vh]">
          <div className="bg-white border border-gray-300 px-4 md:px-10 lg:px-20 py-10 rounded-lg overflow-y-scroll h-full">
            <div className="mb-8 flex flex-row justify-between">
              <div className="flex flex-row">
                <img
                  src={visionIcon}
                  alt="Logo"
                  className="rounded-lg border-2 border-gray-300 bg-gray-100 p-1 mr-4"
                  height="65"
                  width="65"
                />
                <div className="flex flex-col p-1">
                  <h3 className="text-2xl font-bold">{ideaid}</h3>
                  <p
                    className="text-gray-500 text-lg outline-none flex-row"
                    contentEditable="true"
                    onInput={(event) => {
                      ideaInfo.title = event.target.innerText;
                      setIdeaInfo(ideaInfo);
                    }}
                  >
                    {ideaInfo.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-row align-end h-fit">
                <button
                  className="border-2 border-black bg-green-300 hover:bg-green-400 rounded-lg p-2 flex flex-row"
                  onClick={() => SaveData()}
                >
                  SAVE
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div>
                <label className="font-bold">Description</label>
              </div>
              <div>
                <p
                  contentEditable="true"
                  className="outline-none flex-row"
                  onInput={(event) => {
                    ideaInfo.description = event.target.innerText;
                    setIdeaInfo(ideaInfo);
                  }}
                >
                  {ideaInfo.description}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row mb-2">
                <label className="font-bold">Time Insights</label>
                {ideaInfo.time_insight != undefined &&
                  Object.keys(ideaInfo.time_insight).length > 0 && (
                    <img
                      src={researchIcon}
                      alt="Logo"
                      className=" rounded-lg hover:bg-gray-100 px-1 ml-2"
                      height="10"
                      width="30"
                      onClick={() => generateTimeInsights()}
                    />
                  )}
              </div>
              <div className="outline-none flex-row">
                {ideaInfo.time_insight != undefined &&
                Object.keys(ideaInfo.time_insight).length > 0 ? (
                  <>
                    <div className="outline-none flex-row">
                      {Object.keys(ideaInfo.time_insight).map((key, index) => (
                        <p>
                          <span
                            contentEditable="false"
                            className="font-bold text-sm text-gray-600"
                          >
                            {key.toUpperCase() + " :"}
                          </span>
                          <p
                            contentEditable="true"
                            className="outline-none flex-row"
                            onInput={(event) => {
                              ideaInfo.time_insight[key] =
                                event.target.innerText;
                              setIdeaInfo(ideaInfo);
                            }}
                          >
                            {ideaInfo.time_insight[key].toString()}
                          </p>
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row"
                      onClick={() => generateTimeInsights()}
                    >
                      <img
                        src={researchIcon}
                        alt="Logo"
                        className="rounded-lg  mr-2"
                        height="20"
                        width="20"
                      />
                      <p className="text-gray-500 text-sm">Add Time Insights</p>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row mb-2">
                <label className="font-bold">Cost Insights</label>
                {ideaInfo.cost_insight != undefined &&
                  Object.keys(ideaInfo.cost_insight).length > 0 && (
                    <img
                      src={researchIcon}
                      alt="Logo"
                      className=" rounded-lg hover:bg-gray-100 px-1 ml-2"
                      height="10"
                      width="30"
                      onClick={() => generateCostInsights()}
                    />
                  )}
              </div>
              <div className="outline-none flex-row">
                {ideaInfo.cost_insight != undefined &&
                Object.keys(ideaInfo.cost_insight).length > 0 ? (
                  <>
                    <div className="outline-none flex-row">
                      {Object.keys(ideaInfo.cost_insight).map((key, index) => (
                        <p>
                          <span
                            contentEditable="false"
                            className="font-bold text-sm text-gray-600"
                          >
                            {key.toUpperCase() + " :"}
                          </span>
                          <p
                            contentEditable="true"
                            className="outline-none flex-row"
                            onInput={(event) => {
                              ideaInfo.cost_insight[key] =
                                event.target.innerText;
                              setIdeaInfo(ideaInfo);
                            }}
                          >
                            {ideaInfo.cost_insight[key]}
                          </p>
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row"
                      onClick={() => generateCostInsights()}
                    >
                      <img
                        src={researchIcon}
                        alt="Logo"
                        className="rounded-lg  mr-2"
                        height="20"
                        width="20"
                      />
                      <p className="text-gray-500 text-sm">Add Cost Insights</p>
                    </button>
                  </>
                )}
              </div>
            </div>


            <div className="mb-4">
              <div className="flex flex-row mb-2">
                <label className="font-bold">Subtasks</label>
                {ideaInfo.subtask && (
                  <img
                    src={researchIcon}
                    alt="Logo"
                    className=" rounded-lg hover:bg-gray-100 px-1 ml-2"
                    height="10"
                    width="30"
                    onClick={() => generateSubtasks()}
                  />
                )}
              </div>
              <div className="outline-none flex-row">
                {ideaInfo.subtask ? (
                  <>
                    <div
                      contentEditable="true"
                      className="outline-none flex-row"
                      ref={visionContainerRef}
                      onInput={(event) => {
                        ideaInfo.subtask = event.target.innerText;
                        setIdeaInfo(ideaInfo);
                      }}
                    >
                      <pre style={{ fontFamily: "Poppins, sans-serif" }}>
                        {formatResponse(ideaInfo.subtask, visionContainerRef)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row"
                      onClick={() => generateSubtasks()}
                    >
                      <img
                        src={researchIcon}
                        alt="Logo"
                        className="rounded-lg  mr-2"
                        height="20"
                        width="20"
                      />
                      <p className="text-gray-500 text-sm">Add Subtasks</p>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row mb-2">
                <label className="font-bold">Similar Project Insights</label>
                {ideaInfo.similar_insights && (
                  <img
                    src={researchIcon}
                    alt="Logo"
                    className=" rounded-lg hover:bg-gray-100 px-1 ml-2"
                    height="10"
                    width="30"
                    onClick={() => generateSimilarInsights()}
                  />
                )}
              </div>
              <div className="outline-none flex-row">
                {ideaInfo.similar_insights ? (
                  <>
                    <div
                      contentEditable="true"
                      className="outline-none flex-row"
                      ref={visionContainerRef}
                      onInput={(event) => {
                        ideaInfo.similar_insights = event.target.innerText;
                        setIdeaInfo(ideaInfo);
                      }}
                    >
                      <pre style={{ fontFamily: "Poppins, sans-serif" }}>
                        {formatResponse(ideaInfo.similar_insights, visionContainerRef)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row"
                      onClick={() => generateSimilarInsights()}
                    >
                      <img
                        src={researchIcon}
                        alt="Logo"
                        className="rounded-lg  mr-2"
                        height="20"
                        width="20"
                      />
                      <p className="text-gray-500 text-sm">Add Similar Project Insights</p>
                    </button>
                  </>
                )}
              </div>
            </div>

            

            <div className="mb-4">
              <div>
                <label className="font-bold">Imagine Further</label>
              </div>
              <div
                className="outline-none flex-row"
                contentEditable="true"
                onInput={(event) => {
                  // console.log(event.target.innerText);
                  if (event.target.innerText.length == 0) {
                    setBlock("Start writing here...");
                    ideaInfo.visiondoctext = "Start writing here...";
                    setIdeaInfo(ideaInfo);
                  } else {
                    ideaInfo.visiondoctext = event.target.innerText;
                    setIdeaInfo(ideaInfo);
                  }
                }}
                ref={customTextRef}
              >
                <pre style={{ fontFamily: "Poppins, sans-serif" }}>
                  {formatResponse(block, visionContainerRef)}
                </pre>
              </div>
            </div>

            <div className="flex flex-row justify-between hover:opacity-100 md:opacity-0 opacity-100">
              <hr className="w-[70vw] border-gray-100 mt-3" />
              <button
                className="w-full items-center text-sm font-bold rounded-full text-red-500"
                onClick={AddBlock}
              >
                + Add Block
              </button>
              <hr className="w-[70vw] full border-gray-100 mt-3" />
            </div>
          </div>
        </main>

        <aside className={`col-span-4 md:col-span-2 lg:col-span-1 flex flex-col space-y-2 p-4 md:ml-3 bg-[#f8f9fb] rounded-lg md:max-h-[85vh] md:relative fixed top-0 left-0 right-0 bottom-14 md:z-50 md:translate-x-0 transition-all ${showVisionX?'translate-x-0 z-40':'-z-50 translate-x-[100vw]'}`}>
          <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg mb-4">
            <h1 className="text-2xl font-bold">VisionX </h1>
          </div>
          <section className="flex flex-col space-y-4 overflow-y-scroll h-full pb-8">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <>
                  <div className="flex items-start mb-4">
                    <div className="flex-none">
                      {/* <Avatar className="rounded-full" size="icon" /> */}
                    </div>
                    <div className="ml-auto mr-2 text-right max-w-3xl">
                      <div className="text-xs text-gray-500 px-1">
                        {localStorage.getItem("ideagen_user_name")}
                      </div>
                      <div className="bg-blue-100 rounded-xl px-5 py-1 mt-1 leading-loose text-sm">
                        {chat.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mb-4">
                    <div className="flex-none">
                      {/* <Avatar className="rounded-full" size="icon" /> */}
                    </div>
                    <div className="ml-2 mr-2 flex-grow max-w-3xl">
                      <div className="text-xs text-gray-500 px-1">VisionX</div>
                      <div
                        className="bg-gray-200 rounded-xl px-5 py-1 mt-1 leading-loose text-sm"
                        ref={containerRef}
                        style={{ whiteSpace: "pre-wrap", overflowY: "auto" }}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: chat.response }}
                        />
                        <div className="flex flex-row justify-center space-x-2 mt-2">
                          <button
                            className="bg-gray-100 hover:bg-white border-2 border-gray-300 rounded-full px-3 py-1 flex flex-row justify-center items-center"
                            onClick={() =>
                              navigator.clipboard.writeText(chat.response)
                            }
                          >
                            <span className="text-sm">Copy</span>
                          </button>
                          <button
                            className="bg-gray-100 hover:bg-white border-2 border-gray-300 rounded-full px-3 py-1 flex flex-row justify-center items-center"
                            onClick={() => {
                              setBlock(customTextRef.current.innerText + "\n" + chat.response);
                              setShowVisionX(false);
                            }}
                          >
                            <span className="text-sm">Add to Vision</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <>
                <div className="flex flex-col space-y-2 p-4">
                  <p>Get started by asking me a question</p>
                </div>
              </>
            )}
            <div ref={messageContainerRef} />
          </section>
          <section className="flex flex-col space-y-4 absolute bottom-0 left-0 right-0 p-2 bg-white rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="flex w-full">
                <input
                  className="p-2 rounded-full shadow-md w-full mr-2 bg-[#efefef] text-sm"
                  placeholder="Enter your message"
                  type="text"
                  ref={message}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                <button
                  className="p-2 rounded-full bg-gray-300 "
                  onClick={() => handleChat()}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-t-2 border-black border-solid rounded-full animate-spin"></div>
                  ) : (
                    <IconArrowup className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </section>
        </aside>

        <button className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white p-4 rounded-t-xl h-14 md:hidden z-50" onClick={()=>setShowVisionX(!showVisionX)}>
          VisionX
        </button>
      </section>
    </div>
  );
}

function IconArrowup(props) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}