import React , {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/IdeaGenLogo.png';
import axios from 'axios';

function VisionDoc() {
  const {ideaid} = useParams()
  const [ideaInfo, setIdeaInfo] = useState({})

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

  useEffect(() => {
      getIdeaInfo()
  },[])

  return (
    <div className="w-full h-screen bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">VisionDoc</h1>
      <div className="bg-white border border-gray-300 px-20 py-10 min-h-[89vh] rounded-lg">
        <div className="mb-8 flex flex-row">
          {/* This is where you can start writing in block 1 */}
          <img src={logo} alt="Logo" className="rounded-full mr-4" height="50" width="50" />
          <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-gray-500">{ideaid}</h3>
              <p>{ideaInfo.title}</p>
          </div>
        </div>
        <div>
          <label className="font-bold">Description</label>
        </div>
        <div contentEditable="true" className='outline-none flex-row'>
          {/* This is where you can start writing in block 2 */}
          <p>{ideaInfo.description}</p>
        </div>
      </div>
    </div>
  );
}

export default VisionDoc;
