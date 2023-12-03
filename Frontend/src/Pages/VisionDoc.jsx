import React , {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/IdeaGenLogo.png';
import axios from 'axios';
import Navbar from '../components/Layout/Navbar';

function VisionDoc() {
  const {ideaid} = useParams()
  const [ideaInfo, setIdeaInfo] = useState({})
  const [chats, setChats] = useState([])

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
      <Navbar />
      <section className="grid grid-cols-5">
        <main className="col-span-4 max-h-[88vh]">
      <div className="bg-white border border-gray-300 px-20 py-10 min-h-fit rounded-lg">
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
      </main>
      
        <aside className="flex flex-col items-center justify-between mx-3 bg-[#f8f9fb] rounded-lg">
          
        </aside>
      </section>
    </div>
  );
}

export default VisionDoc;
