import imagem from "../assets/images/IdeaGenLogo.png"
import ResearchCard from "../components/ResearchCard"
import Collapsible from "../components/Collapsible"
import axios from "axios"
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import plus_icon from "../assets/images/plus_icon_black.png"
import NewIdeaModal from "../components/modals/NewIdeaModal"
import IdeaDashboard from "../components/IdeaDashboard"
import Navbar from "../components/Layout/Navbar"
import folderIcon from '../assets/images/folder_icon.png';
import animationdata from "../assets//animations/Animation - 1701635048705.json"
import researchIcon from '../assets/images/research_bank_icon.png';
import visionDocIcon from '../assets/images/vision_doc_icon.png';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import '../assets/dashboard.css';


export default function ResearchBank() {
    const [topics, setTopics] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTopic, setCurrentTopic] = useState("")
   
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
    <section className="grid h-screen text-black grid-cols-5">
      <aside className="flex flex-col items-center justify-between p-10 border-r-2 bg-[#f8f9fb] dark:bg-zinc-900 ">
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
          <h1 className="text-2xl font-bold text-black">IDEAGEN</h1>
        </div>
        <div className="space-y-4 mt-20 text-center">
          <h2 className="text-lg p-2 bg-white rounded-md shadow-lg font-semibold border-b">My Ideas</h2>
          <Accordion className="rounded-lg w-64 border-2">
   
          {Object.keys(topics).map((topic, index) => (
             <AccordionItem className="border-y-2">
             <AccordionItemHeading className="hover:bg-gray-300">
                 <AccordionItemButton className="text-black p-2 font-semibold  flex justify-between ">

                 <img src={folderIcon} alt="Folder icon" className="h-4 w-4 my-auto mr-4" />
        {topic}
                 </AccordionItemButton>
             </AccordionItemHeading>
             <AccordionItemPanel className="  " >
             
                { topic === "Miscellaneous" ? (
                 <Link to={ `../research/${topic}`}>
                 <div className='flex justify-end text-sm flex-row p-2 hover:bg-gray-200'>
                 <img src={researchIcon} alt="Research bank icon" className="h-4 w-4 mr-2" />
                 Research Bank
                 </div>
                 </Link>
                ) : (
                  <><Link to={ `../vision-doc/${topic}`}>
                  <div className='flex  justify-end flex-row text-sm p-2 hover:bg-gray-200'>
                  <img src={visionDocIcon} alt="Vision doc icon" className="h-4 w-4 mr-2" />
                  Vision Doc
                  </div>
                  </Link>
                  <Link to={ `../research/${topic}`}>
                  <div className='flex justify-end flex-row p-2 text-sm hover:bg-gray-200'>
                  <img src={researchIcon} alt="Research bank icon" className="h-4 w-4 mr-2" />
                  Research Bank
                  </div>
                  </Link></>
                )}
               
                
             </AccordionItemPanel>
           
         </AccordionItem>
                
            ))}
</Accordion>
         
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
      <main className="flex flex-col bg-white col-span-4 p-4">
        
        <Navbar />
  
{currentTopic === "" ? (
  <div className="w-full h-full">
    <div className="flex border-2 border-[#faad14] justify-start space-x-8 mt-4 rounded-lg bg-white w-[95%] h-48 shadow-md mb-4">
  <Lottie
       animationData={animationdata}
       className=" h-full"
     />
     <div className=" p-4 my-auto ">
       <h1 className="text-6xl my-auto font-semibold                                                                                                                      ">IdeaX Hub </h1>
     <h2 class=" mt-8  font-medium text-[#597ef7] text-xl dark:text-gray-400">Refine, Explore, and cultivate groundbreaking ideas.</h2>

    
</div> 

</div>

{/* <div className="grid grid-cols-4 gap-10 mt-10"> */}
  <div className="dashboard relative mx-auto">
    <div class="container">
      <div class="hex pos0">
        <span className="content">
          <h1 className="text-center mb-2 font-normal text-lg">Create New Ideas by </h1>
          <div className="flex justify-center w-full mx-auto border-black border-2 items-center space-x-2 bg-white rounded-full p-2 text-black">
            <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
            New Idea
          </div>
        </span>
      </div>
      <div class="hex pos1">
        <span className="content">
          <h1 className="text-center font-normal text-sm">Click any existing idea from left panel to open "Idea Dashboard" or go to it's "Vision Doc" or "Research Bank"</h1>
        </span>
      </div>
      <div class="hex pos2">
        <span className="content">
          <h1 className="text-center font-normal text-sm">All articles and videos are saved in "Miscellaneous", you can move them to different ideas</h1>
        </span>
      </div>
      <div class="hex pos3">
        <span className="content">
          <h1 className="text-center font-normal text-sm">You can have AI generated problem statements for any idea according to your research bank and reuirements</h1>
        </span>
      </div>
      <div class="hex pos4">
        <span className="content">
          <h1 className="text-center font-normal text-sm">Refine, analyse and formalize your idea through "Market Insights" and recommended "Collaborators"</h1>
        </span>
      </div>
    </div>

    <svg style={{position:'absolute', visibility:'hidden'}} width="0" height="0">
      <defs>
            <filter id="goo">
              {/* <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />     */}
                {/* <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" /> */}
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
    </svg>

  </div>

  {/* <div className="w-56 h-5w-56 bg-white border-2 p-4 font-serif bg-gradient-to-br to-white from-blue-100 shadow-xl rounded-2xl flex flex-col justify-center items-center">
    <h1 className="text-center mb-2 font-normal text-md">Create New Ideas by </h1>
    <div className="flex justify-center w-2/3 mx-auto border-black border-2 items-center space-x-2 bg-white rounded-full p-2 text-black">
      <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
      New Idea
    </div>
  </div>
  <div className="w-56 h-5w-56 bg-white border-2 p-4 font-serif bg-gradient-to-br to-white from-blue-100 shadow-xl rounded-2xl flex flex-col justify-center items-center">
  <h1 className="text-center font-normal text-md">Click any existing idea from left panel to open "Idea Dashboard" or go to it's "Vision Doc" or "Research Bank"</h1>
  </div>
  <div className="w-56 h-5w-56 bg-white border-2 p-4 font-serif bg-gradient-to-br to-white from-blue-100 shadow-xl rounded-2xl flex flex-col justify-center items-center">
  <h1 className="text-center font-normal text-md">All articles and videos are saved in "Miscellaneous", you can move them to different ideas</h1>
  </div>
  <div className="w-56 h-5w-56 bg-white border-2 p-4 font-serif bg-gradient-to-br to-white from-blue-100 shadow-xl rounded-2xl flex flex-col justify-center items-center">
  <h1 className="text-center font-normal text-md">You can have AI generated problem statements for any idea according to your research bank and reuirements</h1>
  </div>
  <div className="w-56 h-5w-56 bg-white border-2 p-4 font-serif bg-gradient-to-br to-white from-blue-100 shadow-xl rounded-2xl flex flex-col justify-center items-center">
  <h1 className="text-center font-normal text-md">Refine, analyse and formalize your idea through "Market Insights" and recommended "Collaborators"</h1>
  </div> */}
  

{/* </div> */}


</div>
  
) : (
  <div></div>
)}


   
      

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



