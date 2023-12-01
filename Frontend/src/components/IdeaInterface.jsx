import Collapsible from "./Collapsible" 
import imagem from "../assets/images/IdeaGenLogo.png"
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import axios from "axios"

export default function IdeaInterface() {
    // Get chat id from url
    const {chatid} = useParams()
    const containerRef = useRef()
    const message = useRef()
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState({})

    const question = [
        "1. Current challenge or pain point?",
        "2. Desired positive change?",
        "3. Interest or industry preference?",
        "4. Any budget or time limits?",
        "5. Preferred technologies or trends?",
    ]
    const [answer, setAnswer] = useState([])
    const [index, setIndex] = useState(-1)
    const [chats, setChats] = useState([])
    const [initialIdeas, setInitialIdeas] = useState([])


    const formatResponse = (text, containerRef) => {
        const result = [];
        let count = 0;
        const maxCount = containerRef.current ? Math.floor(containerRef.current.offsetWidth / 9.5) : 70;
    
        for (let i = 0; i < text.length; i++) {
            result.push(text[i]);
            count++;
    
            if(text[i] === '\n') {
                count = 0;
            }

            if(count === 1 && text[i] === ' ') {
                result.pop();
            }

            // Check if the next word is going to exceed the maxCount
            let temp = text.slice(i+1).split(' ')[0]
            if (count + temp.length > maxCount) {
                result.push('\n');
                count = 0;
            }
    
            if (count === maxCount && text[i] !== '\n') {
                result.push('\n');
                count = 0;
            }
        }
    
        return result.join('');
    };

    const handleChat = () => {
        if(index === -1){
            setChats([...chats, {message: message.current.value, response: question[index+1]}])
            message.current.value = ""
            setIndex(index+1)
        }
        else{
            if(index === question.length - 1){
                setChats([...chats, {message: message.current.value, response: "Generating ideas..."}])
                setLoading(true)
                axios.post(`http://localhost:8000/generate_idea`,{
                    userid : localStorage.getItem("ideagen_user_id"),
                    idea : 'idea_1',
                    answer : answer.join(' ###NewAnswer### ') + ' ###NewAnswer### ' + message.current.value
                }
                ).then((response) => {
                    ideas = response.data.ideas
                    setInitialIdeas(ideas)
                    // Replace the "Generating ideas..." message with the initial ideas
                    setChats(chats.slice(0, -1))
                    setChats([...chats, {message: message.current.value, response: ideas}])
                    setLoading(false)
                }, (error) => {
                    console.log(error)
                })
            }
            else{
                setAnswer([...answer, message.current.value])
                setChats([...chats, {message: message.current.value, response: question[index+1]}])
                message.current.value = ""
                setIndex(index+1)
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleChat();
        }
    };
        
    useEffect(() => {
        axios.get(`http://localhost:8000/get_topics`,{
            params:{
                userid : localStorage.getItem("ideagen_user_id")
            }
        }
        ).then((response) => {
            console.log(response)
            setTopics(response.data.topics)
        }, (error) => {
            console.log(error)
        })
    },[chatid])

  return (
    <section>
      <main className="flex flex-col p-4">
        <section className="flex items-center justify-end mb-4">
        <div className="flex items-center space-x-2">
            <svg
                className=" h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-lg">{localStorage.getItem("ideagen_logged_in")? localStorage.getItem("ideagen_user_name"): "" }</span>
          </div>
        </section>
        <section className="flex flex-col space-y-4 overflow-y-scroll max-h-[82vh] min-h-[82vh]">
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-md shadow-md mr-2">
                <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-900 rounded-md mb-4">
                    <div className="items-center">
                        <h3 className="text-lg font-semibold ml-4"></h3>
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
                            <div className="flex-none">{/* <Avatar className="rounded-full" size="icon" /> */}</div>
                            <div className="ml-2 mr-2 flex-grow">
                                <div className="text-sm text-gray-500">AI</div>
                                <div className="bg-blue-200 dark:bg-zinc-700 rounded-md px-5 py-3 mt-1">Let's start the journey of the idea creation. Before generating some amazing ideas, we would like you to answer some basic questions for us</div>
                            </div>
                        </div>
                {chats ? (
                    chats.map((chat, index) => (
                        <>
                            {index !== 0 ?
                            <div className="flex items-start mb-4">
                                <div className="flex-none">{/* <Avatar className="rounded-full" size="icon" /> */}</div>
                                <div className="ml-2 mr-2 flex-grow">
                                    <div className="text-sm text-gray-500">User</div>
                                    <div className="bg-gray-200 dark:bg-zinc-700 rounded-md px-5 py-3 mt-1">{chat.message}</div>
                                </div>
                            </div>
                            : ""}
                            <div className="flex items-start mb-4">
                                <div className="ml-auto flex-none">{/* <Avatar className="rounded-full" size="icon" /> */}</div>
                                <div className="ml-2 mr-2 flex-grow">
                                    <div className="text-sm text-gray-500">AI</div>
                                    <div
                                        className="bg-blue-200 dark:bg-blue-900 rounded-md px-5 py-3 mt-1"
                                        ref={containerRef}
                                        style={{ whiteSpace: 'pre-wrap', overflowY: 'auto' }}
                                    >
                                        <pre dangerouslySetInnerHTML={{ __html: formatResponse(chat.response, containerRef) }} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    ""
                )}
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
            <button className="p-2 rounded-full bg-gray-300 dark:bg-gray-700" onClick={()=>handleChat()} disabled={loading}>
                {loading ? (
                    <div className="w-5 h-5 border-t-2 border-black border-solid rounded-full animate-spin"></div>
                ): <IconArrowup className="h-5 w-5" />}
            </button>
            </div>
          </div>
        </section>
      </main>
    </section>
  )
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
  )
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
  )
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
  )
}
