import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";

export default function LearningPathQuestions() {
  const { ideaid } = useParams();
  const topicid = ideaid;
  const containerRef = useRef();
  const message = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [learningpath, setlearningpath] = useState()
console.log(topicid);
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

//   useEffect(() => {
//     // Perform asynchronous operations here based on ideaid
//     console.log(ideaid);
//   }, [ideaid]); 
  function formatResponse(text, containerRef) {
    //console.log("ideaid", ideaid);
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

  function handleNavigate(title, description, skills) {
    axios
    .post(`http://localhost:8000/select_idea`, {
      userid: localStorage.getItem("ideagen_user_id"),
      idea: ideaid,
      title: title,
      description: description,
      skills:skills,
    })
    .then(
        axios
        .post(`http://localhost:8000/generate_learning_path`, {
            userid: localStorage.getItem("ideagen_user_id"),
            ideaid: ideaid,
        })
        .then(
            (response) => {
                console.log(response.data);
                setlearningpath(JSON.parse(response.data))
            },
            (error) => {
                console.log(error);
            }
        ),
      (error) => {
        console.log(error);
      }
    );

    
  };

  function handleChat() {
    if (index === question.length - 1) {
      setChats([
        ...chats,
        { message: message.current.value, response: "Generating ideas..." },
      ]);
      setLoading(true);
      axios
        .post(`http://localhost:8000/generate_learning_path_idea`, {
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

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChat();
    }
  };

  function scrollToBottom() {
    if(containerRef.current)containerRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  
  return (
    <section>
      <main className="flex flex-col">
        <Navbar link={"/dashboard"} noBurger={true} />
        <section className="flex flex-col max-h-[80vh] p-4 overflow-y-scroll pb-10">
          <div className="p-4 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md mb-4">
              <div className="flex flex-col justify-center mx-2 md:mx-4">
                <h3 className="text-lg font-semibold">IdeaX</h3>
                <span className="text-sm text-gray-500">
                  Let's start the journey of the idea creation. Before
                  generating some amazing ideas, we would like you to answer
                  some basic questions for us
                </span>
              </div>
              <img
                alt="Icon"
                className="rounded-lg mr-2 hidden md:block"
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
                <div className="bg-blue-100 rounded-md px-5 py-3 mt-1">
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
                      <div className="ml-auto text-right max-w-3xl">
                        <div className="text-sm text-gray-500">User</div>
                        <div className="bg-gray-200 rounded-xl px-5 py-3 mt-1 leading-loose">
                          {chat.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="flex-none">
                        {/* <Avatar className="rounded-full" size="icon" /> */}
                      </div>
                      <div className="">
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
                                className=" hover:border-x-4 hover:border-y-4 bg-white border-4  rounded-md p-4 shadow-md border-transparent hover:border-green-300"
                              >
                                <h2 className="text-lg p-2 font-semibold mb-4">
                                  {index + 1}. {problem.title}
                                </h2>
                                <p className="text-gray-600 p-2">
                                  {problem.description}
                                </p>
                                <p className="text-lg p-2 font-semibold mb-4">Skills Required</p>
                                <p className="text-gray-600 p-2">
                                  {problem.skills}
                                </p>
                                <button
                                  onClick={() =>
                                    handleNavigate(
                                      problem.title,
                                      problem.description,
                                      problem.skills
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
                            className="bg-blue-100 rounded-xl px-5 py-3 mt-1 leading-loose w-full max-w-3xl"
                            ref={containerRef}
                            style={{
                              // whiteSpace: "pre-wrap",
                              overflowY: "auto",
                            }}
                          >
                            <span
                              className="w-full"
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
          <div ref={containerRef} />
        </section>
        <section className="flex flex-col p-4 fixed bottom-0 w-full h-auto bg-white">
          <div className="flex items-center space-x-2">
            <div className="flex w-full">
              <input
                className="p-2 rounded-full shadow-md w-full mr-2 bg-[#efefef]"
                placeholder="Enter your message"
                type="text"
                ref={message}
                onKeyPress={handleKeyPress}
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