import React , {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/IdeaGenLogo.png';
import redoIcon from '../assets/images/redo_icon.png';
import visionIcon from '../assets/images/vision_icon.png';
import researchIcon from '../assets/images/research_bank_icon.png';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';

function VisionDoc() {
  const {ideaid} = useParams()
  const [ideaInfo, setIdeaInfo] = useState({})
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef()
  const messageContainerRef = useRef()
  const message = useRef()
  const [blocks, setBlocks] = useState(["Start writing here..."])


  const getIdeaInfo = () => {
    console.log(ideaid)
    axios.get(`http://localhost:8000/get_topic`,{
          params:{
              userid: localStorage.getItem("ideagen_user_id"),
              topicid : ideaid
          }
      }
      ).then((response) => {
          console.log(response)
          setIdeaInfo(response.data)
      }, (error) => {
          console.log(error)
      })
  }

  const formatResponse = (text, containerRef) => {
    const result = [];
    let count = 0;
    const maxCount = containerRef.current ? Math.floor(containerRef.current.offsetWidth / 8) : 40;

    console.log(maxCount)

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleChat();
    }
  };

  const handleChat = () => {
    setLoading(true)
    console.log("Sending message")
    console.log(message.current.value)
    axios.post(`http://localhost:8000/idea_interface`,{
        ideaid: ideaid,
        userid: localStorage.getItem("ideagen_user_id"),
        message: message.current.value
    }
    ).then((response) => {
        console.log(response)
        setChats([...chats,{
            message: message.current.value,
            response: response.data.response
        }])
        message.current.value = ""
        setLoading(false)
    }, (error) => {
        console.log(error)
        setLoading(false)
    })
  }

  const generateTimeInsights = () => {
    axios.post(`http://localhost:8000/get_time_insights`, {
      ideaid: ideaid,
      userid: localStorage.getItem("ideagen_user_id")
    }
    ).then((response) => {
      console.log(response)
      getIdeaInfo()
    }, (error) => {
      console.log(error)
    })
  }

  const generateCostInsights = () => {
    axios.post(`http://localhost:8000/get_cost_insights`, {
      ideaid: ideaid,
      userid: localStorage.getItem("ideagen_user_id")
    }
    ).then((response) => {
      console.log(response)
      getIdeaInfo()
    }, (error) => {
      console.log(error)
    })
  }

  const generateSubtasks = () => {
    axios.post(`http://localhost:8000/get_subtasks`, {
      ideaid: ideaid,
      userid: localStorage.getItem("ideagen_user_id")
    }
    ).then((response) => {
      console.log(response)
      getIdeaInfo()
    }, (error) => {
      console.log(error)
    })
  }

  const handleBlockChange = (event, index) => {
    if(event.target.innerText !== ""){
      return;
    }
  
    // Your existing logic
    if (blocks.length === 1) {
      setBlocks(["Start writing here..."]);
      return;
    }
    if (event.target.innerText === "") {
      setBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
      console.log("I am here");
    }
  };

  function scrollToBottom() {
    messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
      getIdeaInfo()
      setChats([
        {
            message: "Hello",
            response: "Hi"
        },
        {
            message: "How are you?",
            response: "Good"
        },
    ])

    axios.get(`http://localhost:8000/get_idea_chat`,{
      params:{
          ideaid: ideaid,
          userid: localStorage.getItem("ideagen_user_id")
      }
    }).then((response) => {
      console.log(response)
      setChats(response.data.data)
    }, (error) => {
      console.log(error)
    })
  },[])

  return (
    <div className="w-full h-screen bg-gray-200 p-4">
      <Navbar />
      <section className="grid grid-cols-4">
        <main className="col-span-3 min-h-[88vh] max-h-[88vh]">
      <div className="bg-white border border-gray-300 px-20 py-10 rounded-lg min-h-[90vh] max-h-[90vh] overflow-y-scroll">
        <div className="mb-8 flex flex-row justify-between">
          {/* This is where you can start writing in block 1 */}
          <div className="flex flex-row">
            <img src={visionIcon} alt="Logo" className="rounded-lg border-2 border-gray-300 bg-gray-100 p-1 mr-4" height="65" width="65" />
            <div className="flex flex-col p-1">
                <h3 className="text-2xl font-bold">{ideaid}</h3>
                <p className="text-gray-500 text-lg">{ideaInfo.title}</p>
            </div>
          </div>
          <div className="flex flex-row align-end h-fit">
            <button className="border-2 border-black bg-green-300 hover:bg-green-400 rounded-lg p-2 flex flex-row">
              SAVE
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div>
            <label className="font-bold">Description</label>
          </div>
          <div contentEditable="true" className='outline-none flex-row'>
            {/* This is where you can start writing in block 2 */}
            <p>{ideaInfo.description}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-row mb-2">
            <label className="font-bold">Time Insights</label>
            {(ideaInfo.time_insight!=undefined && Object.keys(ideaInfo.time_insight).length>0) &&
              <img src={researchIcon} alt="Logo" className=" rounded-lg hover:bg-gray-100 px-1 ml-2" height="10" width="30" onClick={()=>generateTimeInsights()}/>
            }
          </div>
          <div className='outline-none flex-row'>
            {/* This is where you can start writing in block 2 */}
            {ideaInfo.time_insight!=undefined && Object.keys(ideaInfo.time_insight).length>0 ? <>
              <div contentEditable="true" className='outline-none flex-row'>
                {Object.keys(ideaInfo.time_insight).map((key, index) => (
                  <p><span className='font-bold text-sm text-gray-600'>{key.toUpperCase()+" :"}</span> {ideaInfo.time_insight[key].toString()}</p>
                ))}
              </div>
            </>:
            <>
              <button className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row" onClick={()=>generateTimeInsights()}>
                <img src={researchIcon} alt="Logo" className="rounded-lg  mr-2" height="20" width="20"/>
                <p className='text-gray-500 text-sm'>Add Time Insights</p>
              </button>
            </>}
          </div>
        </div>

        <div className="mb-4">
        <div className="flex flex-row mb-2">
            <label className="font-bold">Cost Insights</label>
            {(ideaInfo.cost_insight!=undefined && Object.keys(ideaInfo.cost_insight).length>0) &&
              <img src={researchIcon} alt="Logo" className=" rounded-lg hover:bg-gray-100 px-1 ml-2" height="10" width="30" onClick={()=>generateCostInsights()}/>
            }
          </div>
          <div className='outline-none flex-row'>
            {/* This is where you can start writing in block 2 */}
            {ideaInfo.cost_insight!=undefined && Object.keys(ideaInfo.cost_insight).length>0 ? <>
              <div contentEditable="true" className='outline-none flex-row'>
                {Object.keys(ideaInfo.cost_insight).map((key, index) => (
                  <p><span className='font-bold text-sm text-gray-600'>{key.toUpperCase()+" :"}</span> {ideaInfo.cost_insight[key]}</p>
                ))}
              </div>
            </>:
            <>
              <button className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row" onClick={()=>generateCostInsights()}>
                <img src={researchIcon} alt="Logo" className="rounded-lg  mr-2" height="20" width="20"/>
                <p className='text-gray-500 text-sm'>Add Cost Insights</p>
              </button>
            </>}
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className="font-bold">Subtasks</label>
          </div>
          <div className='outline-none flex-row'>
            {/* This is where you can start writing in block 2 */}
            {ideaInfo.subtask ? <>
              <div contentEditable="true" className='outline-none flex-row'>
                <p>{ideaInfo.subtask}</p>
              </div>
            </>:
            <>
              <button className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 flex flex-row">
                <img src={researchIcon} alt="Logo" className="rounded-lg  mr-2" height="20" width="20"/>
                <p className='text-gray-500 text-sm'>Add Subtasks</p>
              </button>
            </>}
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label className='font-bold'>Imagine Further</label>
          </div>
          <div className='outline-none flex-row'>
            {blocks.map((block, index) => (
              <div className='outline-none flex-row'>
                <p contentEditable="true" className="outline-none" onInput={(event) => handleBlockChange(event, index)}>{block}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </main>
      
        <aside className="flex flex-col space-y-2 p-4 ml-3 bg-[#f8f9fb] rounded-lg min-h-[90vh] max-h-[90vh]">
          <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg mb-8">
            <h1 className="text-2xl font-bold">VisionX </h1>
          </div>
          <section  className="flex flex-col space-y-4 overflow-y-scroll max-h-[63vh] min-h-[63vh]">
          {
            chats.length > 0 ? chats.map((chat, index) => (
              <>
                  <div className="flex items-start mb-4">
                      <div className="flex-none">{/* <Avatar className="rounded-full" size="icon" /> */}</div>
                      <div className="ml-2 mr-2 text-right max-w-3xl w-full">
                          <div className="text-xs text-gray-500 px-1">{localStorage.getItem("ideagen_user_name")}</div>
                          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl px-5 py-1 mt-1 leading-loose text-sm">{chat.message}</div>
                      </div>
                  </div>
                  <div className="flex items-start mb-4">
                      <div className="flex-none">{/* <Avatar className="rounded-full" size="icon" /> */}</div>
                      <div className="ml-2 mr-2 flex-grow max-w-3xl">
                          <div className="text-xs text-gray-500 px-1">VisionX</div>
                          <div
                              className="bg-gray-200 dark:bg-zinc-700 rounded-xl px-5 py-1 mt-1 leading-loose text-sm"
                              ref={containerRef}
                              style={{ whiteSpace: 'pre-wrap', overflowY: 'auto' }}
                          >
                              <span dangerouslySetInnerHTML={{ __html: chat.response}} />
                          <div className="flex flex-row justify-center space-x-2 mt-2">
                            <button className="bg-gray-100 dark:bg-zinc-700 hover:bg-white border-2 border-gray-300 rounded-full px-3 py-1 flex flex-row" onClick={()=>navigator.clipboard.writeText(chat.response)}>
                              <span className="text-sm">Copy</span>
                            </button>
                            <button className="bg-gray-100 dark:bg-zinc-700 hover:bg-white border-2 border-gray-300 rounded-full px-3 py-1 flex flex-row" onClick={()=>{
                              setBlocks([...blocks, chat.response])
                            }}>
                              <span className="text-sm">Add to Vision</span>
                            </button>
                          </div>
                          </div>
                      </div>
                  </div>
              </>
            )) : <>
              <div className='flex flex-col space-y-2 p-4'>
                <p>Get started by asking me a question</p>
              </div>
            </>
          }
          <div ref={messageContainerRef} />
          </section>
          <section className="flex flex-col space-y-4 ">
          <div className="mt-4 flex items-center space-x-2">
          <div className="flex w-full">
            <input
                className="p-2 rounded-full shadow-md w-full mr-2 bg-[#efefef] text-sm"
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
        </aside>
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
  )
}

export default VisionDoc;
