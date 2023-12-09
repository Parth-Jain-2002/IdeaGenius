import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

export default function ChatInterface() {
  // Get chat id from url
  const { chatid } = useParams();
  const containerRef = useRef();
  const messageContainerRef = useRef();
  const message = useRef();
  const [chats, setChats] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const formatResponse = (text, containerRef) => {
    const result = [];
    let count = 0;
    const maxCount = containerRef.current
      ? Math.floor(containerRef.current.offsetWidth / 9.5)
      : 70;

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

  const handleChat = () => {
    setLoading(true);
    let message_text = message.current.value;
    message.current.value = "";
    // console.log("Sending message");
    // console.log(message_text);
    axios
      .post(`http://localhost:8000/chat_interface`, {
        chat_id: chatid,
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChat();
    }
  };

  function scrollToBottom() {
    messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    setChats([
      {
        message: "Hello",
        response: "Hi",
      },
      {
        message: "How are you?",
        response: "Good",
      },
    ]);
    axios
      .get(`http://localhost:8000/get_chat`, {
        params: {
          chat_id: chatid,
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

    axios
      .get(`http://localhost:8000/get_thread`, {
        params: {
          chat_id: chatid,
        },
      })
      .then(
        (response) => {
          // console.log(response);
          setChatInfo(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [chatid]);

  return (
    <section className="grid h-screen grid-cols-5">
      <Sidebar />
      <main className="flex flex-col col-span-4 p-4">
        <Navbar />
        <section className="flex flex-col space-y-4 overflow-y-scroll max-h-[82vh]">
          <div className="p-4 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md mb-4">
              <div className="items-center">
                <h3 className="text-lg font-semibold ml-4">{chatInfo.title}</h3>
                <span className="text-sm text-gray-500 ml-4">
                  {chatInfo.url}
                </span>
              </div>
              <img
                alt="Icon"
                className="rounded-lg mr-2"
                height="80"
                src={chatInfo.imgsrc}
                style={{
                  aspectRatio: "30/30",
                  objectFit: "cover",
                }}
                width="80"
              />
            </div>
            {chats
              ? chats.map((chat, index) => (
                  <>
                    <div className="flex items-start mb-4">
                      <div className="flex-none">
                      </div>
                      <div className="ml-auto mr-2 text-right max-w-3xl">
                        <div className="text-sm text-gray-500">User</div>
                        <div className="bg-gray-200 rounded-xl px-5 py-3 mt-1 leading-loose">
                          {chat.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="flex-none">
                      </div>
                      <div className="ml-2 mr-2 flex-grow max-w-3xl">
                        <div className="text-sm text-gray-500">AI</div>
                        <div
                          className="bg-blue-100 rounded-xl px-5 py-3 mt-1 leading-loose"
                          ref={containerRef}
                          style={{ whiteSpace: "pre-wrap", overflowY: "auto" }}
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
                      </div>
                    </div>
                  </>
                ))
              : ""}
          </div>
          <div ref={messageContainerRef} />
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