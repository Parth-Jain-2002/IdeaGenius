import axios from "axios"
import React, { useState , useEffect} from 'react'
import visionIcon from '../assets/images/vision_icon.png';
import { useNavigate } from "react-router-dom";
//import Navbar from '../components/Layout/Navbar';
const IdeaDashboard = ({topicid}) => {

    const [topicDetails, setTopicDetails] = useState([])
    const navigate = useNavigate();
    const getTopics = () => {
        axios.get(`http://localhost:8000/get_topic`,{
              params:{
                  userid : localStorage.getItem("ideagen_user_id"),
                  topicid : topicid
              }
          }
          ).then((response) => {
              console.log("response:" ,response.data)
              setTopicDetails(response.data)
          }, (error) => {
              console.log(error)
          })
      }
  
      useEffect(() => {        
          getTopics()
      },[])


    const handleIdeaGeneration = () => {
        navigate(`../idea/${topicid}`);
    }
    const handleIdeaRefinement = () => {
        navigate(`../idea/${topicid}`);
    }

    const exploreMarketInsight = () => {
        navigate(`/market-insight/${topicid}`)
    }

    const explorePeople = () => {
        navigate(`/people/${topicid}`);
    }
      
   return (
    <div className="w-full h-full p-4">

<div className="flex items-center justify-between p-2 dark:bg-gray-900 rounded-md ">
          
<div className=" flex flex-row justify-between ">
    <div className="flex flex-row">  <img src={visionIcon} alt="Logo" className="rounded-lg border-2 border-gray-300 bg-gray-100 p-1 mr-2" height="65" width="68" />
          <div className="flex flex-col p-1">
              <h3 className="text-2xl font-bold">{topicid}</h3>
              <p className="text-gray-500 text-sm">{topicDetails.description}</p>
          </div>
          
          </div>
          {/* This is where you can start writing in block 1 */}
        <div className="ml-96">  {topicDetails.generated ? (
            <button onClick={() => {handleIdeaRefinement()}} className="px-2 py-1 bg-blue-300 rounded-lg">Refine Problem Statement</button>
          ) : (
            <button onClick={() => {handleIdeaGeneration()}} className="px-2 py-1 bg-blue-300 rounded-lg">Generate Problem Statement</button>
          )}</div>
        
        </div>
      </div>
      <div className="flex w-full mt-6">
        <div className="w-2/3 h-full flex flex-col gap-2 rounded-l-lg bg-gray-100">
            <h1 className="text-xl font-medium p-4 mt-1">Marketing Insights</h1>
            <div className="h-96 bg-gray-50"></div>
            <button onClick={() => {exploreMarketInsight()}} className="p-2 mb-2 ml-4 w-32 rounded-xl bg-blue-300">Explore More</button>

        </div>
        <div className="w-1/3 border-l-2 h-full flex flex-col gap-2 rounded-r-lg bg-gray-200">
            <h1 className="text-xl font-medium p-4 mt-1">Recommended People on Trumio</h1>
            <div className="h-96 bg-gray-50"></div>
            <button onClick={() => {explorePeople()}} className="p-2 mb-2 ml-4 w-32 rounded-xl bg-blue-300">Explore More</button>
        </div>
      </div>
    </div>
         
        )
}

export default IdeaDashboard
