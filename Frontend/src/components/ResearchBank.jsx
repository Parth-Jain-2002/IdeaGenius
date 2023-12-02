import imagem from "../assets/images/IdeaGenLogo.png"
import ResearchCard from "./ResearchCard"
import Collapsible from "./Collapsible"
import axios from "axios"
import { useEffect, useState } from "react"
import plus_icon from "../assets/images/plus_icon_black.png"
import NewIdeaModal from "./modals/NewIdeaModal"

export default function ResearchBank() {
    const [threads, setThreads] = useState([])
    const [topics, setTopics] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setIsModalOpen(false)
    }

    const getTopics = () => {
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
    }

    const getThreads = () => {
      axios.get(`http://localhost:8000/get_threads`,{
            params:{
                userid: localStorage.getItem("ideagen_user_id")
            }
        }
        ).then((response) => {
            console.log(response)
            console.log(response.data.data)
            setThreads(response.data.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {        
        getThreads()
        getTopics()
    },[])

    

  return (
    <section className="grid h-screen grid-cols-5">
      <aside className="flex flex-col items-center justify-between p-10 bg-[#f8f9fb] dark:bg-zinc-900 ">
        <div className="flex items-center space-x-2">
          <img
            alt="Logo"
            className="rounded-full mr-2"
            height="50"
            src={imagem}
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            width="50"
          />
          <h1 className="text-2xl font-bold">IDEAGEN</h1>
        </div>
        <div className="space-y-4 mt-20 text-center">
          <h2 className="text-lg p-2 bg-white rounded-md shadow-lg font-semibold border-b">My Ideas</h2>
          {/* { "Idea 1":[], "Idea 2": ["dkfjdfjl","jjdofdsofn"]} */}
          {Object.keys(topics).map((topic, index) => (
                <Collapsible title={topic} data={topics[topic]} chat={true}/>
            ))}
          {/* Add a new idea */}
          <button className="w-full flex justify-center items-center space-x-2 bg-[#f8f9fb] rounded-full p-2 text-black hover:bg-gray-200" onClick={openModal}>
            <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
            New Idea
          </button>
          {isModalOpen && <NewIdeaModal onClose={closeModal} topics={Object.keys(topics)} getTopics={getTopics}/>}
        </div>
        <button className="w-4/5 flex justify-center items-center space-x-2  bg-black rounded-full p-2 text-white">
            <IconLightningbolt className="h-5 w-5 mr-2" />
          Upgrade
        </button>
      </aside>
      <main className="flex flex-col bg-[#f8f9fb] col-span-4 p-4">
        <section className="flex items-center justify-between mb-4">
        <input
            className="w-1/2 p-2 border border-gray-300 rounded-full"
            placeholder="Converse with the research bank"
            type="text"
        />
          <div className="flex items-center space-x-2">
          <span className="text-lg">{localStorage.getItem("ideagen_logged_in")? localStorage.getItem("ideagen_user_name"): "" }</span>
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
          </div>
        </section>
        <section className="space-y-4 overflow-y-scroll max-h-[88vh] overflow-x-hidden">
          <h2 className="text-3xl mt-4 font-semibold">Research Bank</h2>
          <div className="mt-8 grid grid-cols-3 gap-5">
            {threads.map((thread) => (
                <ResearchCard
                    imgSrc={thread.imgsrc}
                    title={thread.title}
                    url={thread.url}
                    chatid={thread.chatid}
                />
            ))}
            </div>
        </section>
      </main>
    </section>
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
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  )
}



