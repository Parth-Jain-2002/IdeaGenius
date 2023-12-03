import imagem from "../assets/images/IdeaGenLogo.png"
import ResearchCard from "../components/ResearchCard"
import Collapsible from "../components/Collapsible"
import axios from "axios"
import Lottie from "lottie-react";
import { useEffect, useState } from "react"
import plus_icon from "../assets/images/plus_icon_black.png"
import NewIdeaModal from "../components/modals/NewIdeaModal"
import IdeaDashboard from "../components/IdeaDashboard"
import Navbar from "../components/Layout/Navbar"
import animationdata from "../assets//animations/Animation - 1701611049947.json"
export default function ResearchBank() {
    const [topics, setTopics] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTopic, setCurrentTopic] = useState()
    const [currentTopicData, setCurrentTopicData] = useState()
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

    useEffect(() => {        
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
         
          {Object.keys(topics).map((topic, index) => (
                <Collapsible title={topic} data={topic} chat={false} />
            ))}
        
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
        {/* To be designed */}
        
        <Navbar />
      {/* <div className="flex justify-start">
      <Lottie
          animationData={animationdata}
          className="w-72 h-72"
        />
        <div className="ml-10 mt-6 items-center">
          <h1 className="text-5xl my-auto font-bold dark:text-white">IdeaX Dashboard</h1>
        <h2 class=" mt-8 font-medium text-gray-500 dark:text-gray-400">Refine, Explore, and cultivate groundbreaking ideas.</h2>
</div>

</div>  */}

     {/* <IdeaDashboard/> */}
     {/* <div className="grid mt-52 grid-cols-3 gap-6">
     {Object.keys(topics).map((topic, index) => (
              

<div class="p-4 border-2 ">
    

  
   
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{topic}</h5>
      
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
     
       
</div>


            ))}
    
     </div> */}
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



