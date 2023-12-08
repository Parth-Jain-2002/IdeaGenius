import axios from "axios";
import React, { useState, useEffect } from "react";
import chatIcon from "../assets/images/chat_icon.png";
import { useNavigate } from "react-router-dom";
import PeopleCard from "../components/PeopleCard";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';



const IdeaDashboard = ({ topicid }) => {
  const [topicDetails, setTopicDetails] = useState([]);
  const [peopleData, setPeopleData] = useState([{}]);
  const navigate = useNavigate();
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizeWords = (str) => {
    if (!str) {
      return '';
    }
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  };
  
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
            ideaid: topicid,
          }),
        }
      );

      const data = await response.json();
      // console.log(data.response);
      return data.response;
    } catch (error) {
      console.log(error);
    }
  }; 
  const getPeeps = async () => {
    try {
      const data = await getPeople();
      const top3People = data.slice(0, 3); // Get the first 3 elements
    
      setPeopleData(top3People);

      // console.log("ideaid: ", ideaid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getTopics = () => {
    axios
      .get(`http://localhost:8000/get_topic`, {
        params: {
          userid: localStorage.getItem("ideagen_user_id"),
          topicid: topicid,
        },
      })
      .then(
        (response) => {
          //console.log("response:", response.data);
          setTopicDetails(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  
  


  useEffect(() => {
    getTopics();
    getPeeps();
  }, [topicid]);

    const handleIdeaGeneration = () => {
        navigate(`../idea/${topicid}`);
    }
    const handleIdeaRefinement = () => {
        navigate(`../vision-doc/${topicid}`);
    }

    const exploreMarketInsight = () => {
        navigate(`/market-insight/${topicid}`)
    }

    const explorePeople = () => {
        navigate(`/people/${topicid}`);
    }
      
   return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between px-10 py-4 dark:bg-gray-900 rounded-3xl border-2 border-sky-200 shadow-lg bg-blue-100">
        <div className=" flex flex-col justify-between w-full">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-1">
              <h3 className="text-2xl font-semibold">{capitalizeWords(topicid)}</h3>
              <div className="self-end items-center hover:bg-blue-300 flex flex-row bg-white px-2 rounded-lg">
                {" "}
                <img src={chatIcon} alt="chat icon" className="h-4 w-4 ml-2 " />
                {topicDetails.generated ? (
                  <button
                    onClick={() => {
                      handleIdeaRefinement();
                    }}
                    className="px-2 py-1 font-semibold text-black"
                  >
                    Refine Idea
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleIdeaGeneration();
                    }}
                    className="px-2 py-2 font-bold text-gray-700 rounded-lg"
                  >
                    Generate Idea
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-row p-1">
              <p className="text-gray-600 text-base ">
                {capitalizeWords(topicDetails.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-6">
        <div className="w-2/3 h-full flex flex-col gap-2 rounded-l-lg ">
            <h1 className="text-xl font-medium p-4 mt-1">Marketing Insights</h1>
            <div className=" w-full">
            <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={45}
        totalSlides={4}
        isPlaying={true}
        className="w-full pr-2 rounded-lg"
      >
     
      
        <Slider className="w-full h-full rounded-lg my-auto">
          <Slide index={0} className="w-full  justify-center rounded-lg bg-blue-200 h-full">
           <h1 className="mx-[45%] mt-[20%]">Slide 1</h1>
          </Slide>
          <Slide index={1} className="w-full rounded-lg bg-blue-300 h-full">
          <h1 className="mx-[45%] mt-[20%]">Slide 2</h1>
          </Slide>
          <Slide index={2} className="w-full rounded-lg bg-blue-200 h-full">
          <h1 className="mx-[45%] mt-[20%]">Slide 3</h1>
          </Slide>
          <Slide index={4} className="w-full rounded-lg bg-blue-300  h-full">
          <h1 className="mx-[45%] mt-[20%]">Slide 4</h1>
          </Slide>
          
        </Slider>
     
        {/* <div className="flex mt-3 justify-between">
        <ButtonBack className="px-4 py-2 rounded-lg text-white hover:bg-[#4661bb] bg-[#597ef7]"></ButtonBack>
        <ButtonNext className="px-4 py-2 rounded-lg text-white hover:bg-[#4661bb] bg-[#597ef7]">Next</ButtonNext></div>
        */}
      </CarouselProvider>
            </div>
            <button onClick={() => {exploreMarketInsight()}} className="p-2 mb-2 ml-4 w-32 rounded-full border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white">Explore More</button>

        </div>
        <div className="w-1/3 border-l-2 h-full flex flex-col gap-2 rounded-r-lg ">
            <h1 className="text-xl font-medium px-4 py-2">Recommended People on Trumio</h1>
            <div className=" px-4">
            {peopleData
              ? peopleData.map((person) => (
                <div className="my-1" key={person.name}>
                <PeopleCard.Small
                  name={person.name}
                  jobTitle={person.jobTitle}
                />
                  </div>
                 
   ))
              : null}
          
            </div>
            <a className="p-2 mb-2 w-32 rounded-full border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white  ml-auto mr-4 text-center" href={`/people/${topicid}`}>Explore More</a>
        </div>
      </div>
    </div>
  );
};

export default IdeaDashboard;
