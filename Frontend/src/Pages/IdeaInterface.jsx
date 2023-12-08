import Collapsible from "../components/Collapsible";
import imagem from "../assets/images/IdeaGenLogo.png";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";

export default function IdeaInterface() {
  const { ideaid } = useParams();
  const containerRef = useRef();
  const message = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const question = [
    "1. Current challenge or pain point?",
    "2. Desired positive change?",
    "3. Interest or industry preference?",
    "4. Any budget or time limits?",
    "5. Preferred technologies or trends?",
  ];
  const [answer, setAnswer] = useState([]);
  const [index, setIndex] = useState(0);
  const [chats, setChats] = useState([]);
  const [initialIdeas, setInitialIdeas] = useState([]);

  const formatResponse = (text, containerRef) => {
    const result = [];
    let count = 0;
    const maxCount = containerRef.current
      ? Math.floor(containerRef.current.offsetWidth / 9.5)
      : 70;

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

  const handleNavigate = (title, description) => {
    axios
      .post(`http://localhost:8000/select_idea`, {
        userid: localStorage.getItem("ideagen_user_id"),
        idea: ideaid,
        title: title,
        description: description,
      })
      .then(
        (response) => {
          // console.log(response);
          navigate(`/dashboard`);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleChat = () => {
    if (index === question.length - 1) {
      setChats([
        ...chats,
        { message: message.current.value, response: "Generating ideas..." },
      ]);
      setLoading(true);
      axios
        .post(`http://localhost:8000/generate_idea`, {
          userid: localStorage.getItem("ideagen_user_id"),
          idea: "idea_1",
          answer:
            answer.join(" ###NewAnswer### ") +
            " ###NewAnswer### " +
            message.current.value,
        })
        .then(
          (response) => {
            let ideas = response.data.response;
            //console.log("ideas : ", ideas)
            //console.log(typeof(ideas))
            setInitialIdeas(JSON.parse(ideas));
            // Replace the "Generating ideas..." message with the initial ideas
            setChats([
              ...chats.slice(0, chats.length),
              { message: message.current.value, response: ideas },
            ]);
            setLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      setAnswer([...answer, message.current.value]);
      setChats([
        ...chats,
        { message: message.current.value, response: question[index + 1] },
      ]);
      message.current.value = "";
      setIndex(index + 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChat();
    }
  };

  return (
    <section>
      <main className="flex flex-col p-4">
        <Navbar link={"/dashboard"} />
        <section className="flex flex-col space-y-4 overflow-y-scroll max-h-[82vh] min-h-[82vh]">
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-md shadow-md mr-2">
            <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-900 rounded-md mb-4">
              <div className="items-center">
                <h3 className="text-lg font-semibold ml-4">IdeaX</h3>
                <span className="text-sm text-gray-500 ml-4">
                  Let's start the journey of the idea creation. Before
                  generating some amazing ideas, we would like you to answer
                  some basic questions for us
                </span>
              </div>
              <img
                alt="Icon"
                className="rounded-lg mr-2"
                height="80"
                src="https://alumni.arizona.edu/sites/default/files/styles/az_large/public/2022-07/is_your_idea_innovative.jpeg?itok=VbGVTSUP"
                style={{
                  aspectRatio: "30/30",
                  objectFit: "cover",
                }}
                width="80"
              />
            </div>
            <div className="flex items-start mb-4">
              <div className="flex-none">
                {/* <Avatar className="rounded-full" size="icon" /> */}
              </div>
              <div className="ml-2 mr-2 max-w-3xl">
                <div className="text-sm text-gray-500">AI</div>
                <div className="bg-blue-100 dark:bg-zinc-700 rounded-md px-5 py-3 mt-1">
                  1. Current challenge or pain point?
                </div>
              </div>
            </div>
            {chats
              ? chats.map((chat, index) => (
                <>
                  <div className="flex items-start mb-4">
                    <div className="flex-none">
                      {/* <Avatar className="rounded-full" size="icon" /> */}
                    </div>
                    <div className="ml-auto mr-2 text-right max-w-3xl">
                      <div className="text-sm text-gray-500">User</div>
                      <div className="bg-gray-200 dark:bg-zinc-700 rounded-xl px-5 py-3 mt-1 leading-loose">
                        {chat.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mb-4">
                    <div className="flex-none">
                      {/* <Avatar className="rounded-full" size="icon" /> */}
                    </div>
                    <div className="ml-2 mr-2 ">
                      <div className="text-sm text-gray-500">AI</div>
                      {index === question.length - 1 &&
                        initialIdeas.length == 4 ? (
                        // Render AI-generated problem statements differently
                        <div className="grid grid-cols-1 md:grid-cols-2 p-2 rounded-xl bg-slate-50 lg:grid-cols-2 gap-12 leading-loose">
                          {initialIdeas.map((problem, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className=" hover:border-x-4 hover:border-y-4 bg-white dark:bg-zinc-900 border-4  rounded-md p-4 shadow-md border-transparent hover:border-green-300"
                            >
                              <h2 className="text-lg p-2 font-semibold mb-4">
                                {index + 1}. {problem.title}
                              </h2>
                              <p className="text-gray-600 p-2">
                                {problem.description}
                              </p>
                              <button
                                onClick={() =>
                                  handleNavigate(
                                    problem.title,
                                    problem.description
                                  )
                                }
                                className="px-4 py-2 rounded-md mt-2 hover:bg-green-400 bg-green-300 text-black"
                              >
                                Select Idea
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        // Default rendering for other AI responses
                        <div
                          className="bg-blue-100 dark:bg-blue-900 rounded-xl px-5 py-3 mt-1 leading-loose max-w-3xl"
                          ref={containerRef}
                          style={{
                            whiteSpace: "pre-wrap",
                            overflowY: "auto",
                          }}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formatResponse(
                                chat.response,
                                containerRef
                              ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))
              : ""}
          </div>
        </section>
        <section className="flex flex-col space-y-4">
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex w-full">
              <input
                className="p-2 rounded-full shadow-md w-full mr-2 bg-[#efefef]"
                placeholder="Enter your message"
                type="text"
                ref={message}
                onKeyPress={handleKeyPress}
              />
              <button
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
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
      </main>
    </section>
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

function IconChevronright(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconLightningbolt(props) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}
