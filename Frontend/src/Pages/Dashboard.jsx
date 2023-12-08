import imagem from "../assets/images/IdeaGenLogo.png";
import axios from "axios";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import plus_icon from "../assets/images/plus_icon_black.png"
import NewIdeaModal from "../components/modals/NewIdeaModal"
import IdeaDashboard from "../components/IdeaDashboard"
import Navbar from "../components/Layout/Navbar"
import folderIcon from '../assets/images/folder_icon.png';
import animationdata from "../assets//animations/Animation - 1701635048705.json"
import loadingAnimation from "../assets//animations/Animation - 1701802141018.json"
import researchIcon from '../assets/images/research_bank_icon.png';
import visionDocIcon from '../assets/images/vision_doc_icon.png';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

import "../assets/dashboard.css";

export default function ResearchBank() {
  const [topics, setTopics] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")
  const [loading, setLoading] = useState(true);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizeWords = (str) => {
    if (!str) {
      return '';
    }
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  };
  
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTopics = () => {
    axios
      .get(`http://localhost:8000/get_topics_details`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
        },
      })
      .then(
        (response) => {
          // console.log(response);
          setTopics(response.data.topics);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getTopics();
    setLoading(false);
  }, [])



  return (loading ? (
    <div className="w-full h-full">
      <Lottie
        className="w-full h-full"
        animationData={loadingAnimation}
      />
    </div>
  ) : (
    <section className="grid h-full text-black grid-cols-5">
      <aside className="flex h-screen flex-col items-center justify-between p-10 border-r-2 bg-[#f8f9fb] ">
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
          <h2 className="text-lg p-2 bg-white rounded-md shadow-lg font-semibold border-b">
            My Ideas
          </h2>
          <Accordion className="rounded-lg w-64 ">
            {Object.keys(topics).map((topic, index) => (
              <AccordionItem className="">
                <AccordionItemHeading className="hover:bg-gray-200 rounded-lg">
                  <AccordionItemButton className="text-black p-2 font-medium  flex justify-start ">
                    <img
                      src={folderIcon}
                      alt="Folder icon"
                      className="h-4 w-4 my-auto mr-4"
                    />
                    {capitalizeWords(topic)}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className=" ml-6 ">
                  {topic === "Miscellaneous" ? (
                    <Link to={`../research/${topic}`}>
                      <div className="flex justify-start rounded-lg text-sm flex-row p-2 hover:bg-gray-200">
                        <img
                          src={researchIcon}
                          alt="Research bank icon"
                          className="h-4 w-4 mr-2"
                        />
                        Research Bank
                      </div>
                    </Link>
                  ) : (
                    <>
                      {topics[topic].generated == true && <Link to={`../vision-doc/${topic}`}>
                        <div className="flex  justify-start rounded-lg flex-row text-sm p-2 hover:bg-gray-200">
                          <img
                            src={visionDocIcon}
                            alt="Vision doc icon"
                            className="h-4 w-4 mr-2"
                          />
                          Vision Doc
                        </div>
                      </Link>}
                      <Link to={`../research/${topic}`}>
                        <div className="flex justify-start flex-row rounded-lg p-2 text-sm hover:bg-gray-200">
                          <img
                            src={researchIcon}
                            alt="Research bank icon"
                            className="h-4 w-4 mr-2"
                          />
                          Research Bank
                        </div>
                      </Link>
                      <button
                        onClick={() => setCurrentTopic(topic)}
                        className="flex rounded-lg w-full justify-start flex-row p-2 text-sm hover:bg-gray-200"
                      >
                        <img
                          src={researchIcon}
                          alt="Research bank icon"
                          className="h-4 w-4 mr-2"
                        />
                        Idea Dashboard
                      </button>
                    </>
                  )}
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>

          <button
            className="w-full flex justify-center items-center space-x-2 bg-[#f8f9fb] rounded-full p-2 text-black hover:bg-gray-200"
            onClick={openModal}
          >
            <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
            New Idea
          </button>
          {isModalOpen && (
            <NewIdeaModal
              onClose={closeModal}
              topics={Object.keys(topics)}
              getTopics={getTopics}
            />
          )}
        </div>
        <button className="w-4/5 flex justify-center items-center space-x-2  bg-black rounded-full p-2 text-white">
          <IconLightningbolt className="h-5 w-5 mr-2" />
          Upgrade
        </button>
      </aside>
      <main className="flex h-full flex-col w-full bg-white col-span-4 p-4">
        <Navbar />
  
{currentTopic === "" || currentTopic === "Miscellaneous" ? (
  <div className="w-full h-full">
    <div className="flex  justify-start space-x-8 rounded-lg bg-white w-[95%] h-28  mb-4">
  <Lottie
       animationData={animationdata}
       className=" h-full"
     />
     <div className=" p-4 my-auto ">
       <h1 className="text-4xl my-auto font-semibold                                                                                                                      ">IdeaX Hub </h1>
     <h2 class=" mt-2  font-medium text-[#597ef7] text-lg ">Refine, Explore, and cultivate groundbreaking ideas.</h2>


              </div>

            </div>

            <div className="w-full h-full p-4">
              {/* <div className="dashboard relative mx-auto"> */}

              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={40}
                totalSlides={5}
                isPlaying={true}
                className="w-full h-2/3"
              >
                <div className="flex w-full border-2 rounded-3xl ">
                  <div className="w-1/3 h-full py-16 ">
                    <Lottie animationData={loadingAnimation} />
                  </div>
                  <Slider className="w-2/3 h-full my-auto">
                    <Slide index={0} className="w-full h-full">
                      <div className="w-full px-[20%] h-full py-24 flex justify-center items-center flex-col">
                        <h1 className="text-center w-52 font-normal text-lg">Create New Ideas by</h1>
                        <div className="flex justify-center w-52 mx-auto border-black border-2 items-center space-x-2 bg-white rounded-full p-2 text-black mt-2">
                          <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
                          New Idea
                        </div>
                      </div>
                    </Slide>
                    <Slide index={1} className="w-full h-full">
                      <div className="w-full px-[20%] h-full py-24 flex justify-center items-center flex-col">
                        <h1 className="text-center w-52 font-normal text-lg">Click any existing idea from left panel to open "Idea Dashboard" or go to its "Vision Doc" or "Research Bank"</h1>
                      </div>
                    </Slide>
                    <Slide index={2} className="w-full h-full">
                      <div className="w-full px-[20%] h-full py-24 flex justify-center items-center flex-col">
                        <h1 className="text-center w-52 font-normal text-lg">All articles and videos are saved in "Miscellaneous", you can move them to different ideas</h1>
                      </div>
                    </Slide>
                    <Slide index={3} className="w-full h-full">
                      <div className="w-full px-[20%] h-full py-24 flex justify-center items-center flex-col">
                        <h1 className="text-center w-52 font-normal text-lg">You can have AI generated problem statements for any idea according to your research bank and requirements</h1>
                      </div>
                    </Slide>
                    <Slide index={4} className="w-full h-full">
                      <div className="w-full px-[20%] h-full py-24 flex justify-center items-center flex-col">
                        <h1 className="text-center w-52 font-normal text-lg">Refine, analyze and formalize your idea through "Market Insights" and recommended "Collaborators"</h1>
                      </div>
                    </Slide>

                  </Slider>
                </div>
                <div className="flex mt-3 justify-between">
                  <ButtonBack className="px-4 py-2 rounded-lg text-white hover:bg-[#4661bb] bg-[#597ef7]">Back</ButtonBack>
                  <ButtonNext className="px-4 py-2 rounded-lg text-white hover:bg-[#4661bb] bg-[#597ef7]">Next</ButtonNext></div>

              </CarouselProvider>

            </div>




          </div>
        ) : (
          <IdeaDashboard topicid={currentTopic} />
        )}
      </main>
    </section>)
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
  );
}
