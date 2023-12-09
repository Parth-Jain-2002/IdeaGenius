import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import imagem from '../../assets/images/IdeaGenLogo.png';
import folderIcon from '../../assets/images/folder_icon.png';
import researchIcon from '../../assets/images/research_bank_icon.png';
import visionDocIcon from '../../assets/images/vision_doc_icon.png';
import plus_icon from '../../assets/images/plus_icon_black.png';
import NewIdeaModal from "../modals/NewIdeaModal";

export default function Sidebar() {
  const [topics, setTopics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const getTopics = () => {
    axios
      .get(`http://localhost:8000/get_topics_details`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
        },
      })
      .then(
        (response) => {
          console.log(response);
          setTopics(response.data.topics);
        },
        (error) => {
          console.log(error);
        }
      );
  };
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

  useEffect(() => {
    getTopics()
  }, [])

  return (
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
                    <Link to={`/vision-doc/${topic}`} disabled={!topics[topic].generated}>
                      <div className={`flex justify-start rounded-lg flex-row text-sm p-2 hover:bg-gray-200 ${!topics[topic].generated && 'cursor-not-allowed opacity-50'}`}>
                        <img
                          src={visionDocIcon}
                          alt="Vision doc icon"
                          className="h-4 w-4 mr-2"
                        />
                        Vision Doc
                      </div>
                    </Link>

                    <Link to={`/research/${topic}`}>
                      <div className="flex justify-start flex-row rounded-lg p-2 text-sm hover:bg-gray-200">
                        <img
                          src={researchIcon}
                          alt="Research bank icon"
                          className="h-4 w-4 mr-2"
                        />
                        Research Bank
                      </div>
                    </Link>
                    <Link
                      to={`/dashboard/${topic}`}
                      className="flex rounded-lg w-full justify-start flex-row p-2 text-sm hover:bg-gray-200"
                    >
                      <img
                        src={researchIcon}
                        alt="Research bank icon"
                        className="h-4 w-4 mr-2"
                      />
                      Idea Dashboard
                    </Link>
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
