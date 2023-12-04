import axios from "axios"
import React, { useState , useEffect} from 'react'
import visionIcon from '../assets/images/vision_icon.png';
//import Navbar from '../components/Layout/Navbar';
const IdeaDashboard = ({topicid}) => {

    const [topicDetails, setTopicDetails] = useState([])

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

      
   return (
    <div className="w-full h-screen p-4">

<div className="flex items-center  justify-between p-2 dark:bg-gray-900 rounded-md ">
          
<div className=" flex flex-row">
          {/* This is where you can start writing in block 1 */}
          <img src={visionIcon} alt="Logo" className="rounded-lg border-2 border-gray-300 bg-gray-100 p-1 mr-4" height="65" width="65" />
          <div className="flex flex-col p-1">
              <h3 className="text-2xl font-bold">{topicid}</h3>
              <p className="text-gray-500 text-lg">{topicDetails.description}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full">
        <div className="w-2/3 rounded-lg bg-gray-100">
            <h1 className="text-xl font-medium p-4 mt-2">Marketing Insights</h1>
        </div>
        <div className="w-1/3 rounded-lg bg-gray-200">
            <h1 className="text-xl font-medium p-4 mt-2">Recommended People on Trumio</h1>
        </div>
      </div>
    </div>
         
        )
}

export default IdeaDashboard
