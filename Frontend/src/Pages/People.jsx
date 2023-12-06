import React, { useEffect, useState } from "react";
import PeopleCard from "../components/PeopleCard";
import { useParams } from "react-router-dom";

import imagem from "../assets/images/IdeaGenLogo.png";
import Collapsible from "../components/Collapsible";
import axios from "axios";
import plus_icon from "../assets/images/plus_icon_black.png";
import NewIdeaModal from "../components/modals/NewIdeaModal";
import Navbar from "../components/Layout/Navbar";

export default function People() {
  const [threads, setThreads] = useState([]);
  const [topics, setTopics] = useState({});
  const [peopleData, setPeopleData] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ideaid } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTopics = () => {
    axios
      .get(`http://localhost:8000/get_topics`, {
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

  // const getThreads = () => {
  //   axios.get(`http://localhost:8000/get_threads`,{
  //         params:{
  //             userid: localStorage.getItem("ideagen_user_id"),
  //             ideaid: ideaid
  //         }
  //     }
  //     ).then((response) => {
  //         console.log(response)
  //         console.log(response.data.data)
  //         setThreads(response.data.data)
  //     }, (error) => {
  //         console.log(error)
  //     })
  // }
  const getPeeps = async () => {
    try {
      const data = await getPeople();
      setPeopleData(data);
      console.log("ideaid: ", ideaid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // getThreads()
    getTopics();
    getPeeps();
  }, []);

  const getPeople = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/get_recommended_people`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ideaid: ideaid,
          }),
        }
      );

      const data = await response.json();
      console.log(data.response);
      return data.response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid h-screen grid-cols-5">
      <aside className="flex flex-col items-center justify-between p-10 bg-[#f8f9fb]">
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
          <h2 className="text-lg p-2 bg-white rounded-md shadow-lg font-semibold border-b">
            My Ideas
          </h2>
          {/* { "Idea 1":[], "Idea 2": ["dkfjdfjl","jjdofdsofn"]} */}
          {topics
            ? Object.keys(topics).map((topic, index) => (
                <Collapsible title={topic} data={topics[topic]} chat={true} />
              ))
            : null}
          {/* Add a new idea */}
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
      <main className="flex flex-col bg-[#eee] col-span-4 p-4">
        <Navbar link={"/dashboard"} />
        <section className="space-y-4 overflow-y-scroll max-h-[88vh] min-h-[88vh] overflow-x-hidden p-2">
          <h2 className="text-3xl mt-4 font-semibold">
            People you may know from alumni circle
          </h2>
          <div className="grid grid-cols-3 justify-center items-center">
            {peopleData
              ? peopleData.map((person) => (
                  <div className="p-4 h-full" key={person.name}>
                    <PeopleCard
                      name={person.name}
                      jobTitle={person.jobTitle}
                      jobDescription={person.jobDescription}
                      institution={person.institution}
                    />
                  </div>
                ))
              : null}
          </div>
          {/* <h2 className="text-3xl mt-8 font-semibold">People you may need for your student team</h2>
          <div className='grid grid-cols-3 justify-center items-center'>
            {peopleData.map((person) => (
              <div className='p-4 h-full'>
                <PeopleCard name={person.name} jobTitle={person.jobTitle} jobDescription={person.jobDescription} institution={person.institution} />
              </div>
            ))}
          </div>
          <h2 className="text-3xl mt-4 font-semibold">People you may need for potential funding rounds</h2>
          <div className='grid grid-cols-3 justify-center items-center'>
            {peopleData.map((person) => (
              <div className='p-4 h-full'>
                <PeopleCard name={person.name} jobTitle={person.jobTitle} jobDescription={person.jobDescription} institution={person.institution} />
              </div>
            ))}
          </div> */}
        </section>
      </main>
    </section>
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
