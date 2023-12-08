import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react"
import loadingAnimation from "../assets//animations/Animation - 1701802141018.json"
import 'pure-react-carousel/dist/react-carousel.es.css';

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

export default function MyProfile() {
  const randomSeed = Math.floor(Math.random() * 1000) + 1;

  const [topics, setTopics] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    profilePicUrl: `https://source.unsplash.com/150x150/?user&${randomSeed}`,
    bannerPicUrl: "https://www.eikojones.com/wp-content/uploads/2016/01/esperanza-inlet-sunrise-1080x480.jpg",
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    currentPlan: 'Free',
    college: 'Indian Institute of Technology, Ropar',
    company: 'Google',
    jobTitle: 'Software Engineer',
    jobDesc: 'I am a software engineer and i engineer software',
    trumio: 'https://prod-app.trumio.ai/profile/TALENT/a30c74f024ad265730e348f6',
  })
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

  const getUserData = async () => {
    let res = await axios.get(`http://localhost:8000/get_user`, {
      params: {
        userid: localStorage.getItem("ideagen_user_id"),
      },
    })
    setUser({
      profilePicUrl: res.data.profilePic,
      bannerPicUrl: res.data.bannerPic,
      name: res.data.name,
      email: res.data.email,
      currentPlan: res.data.currentPlan,
      college: res.data.college,
      company: res.data.company,
      jobTitle: res.data.jobTitle,
      jobDesc: res.data.jobDesc,
      trumio: res.data.trumio,
    });
  }

  const saveDetails = () => {
    setLoading(true)
    const data = {
      userid: localStorage.getItem("ideagen_user_id"),
      name: document.getElementById('input_name').value,
      college: document.getElementById('input_college').value,
      company: document.getElementById('input_company').value,
      jobTitle: document.getElementById('input_jobTitle').value,
      jobDesc: document.getElementById('input_jobDesc').value,
      trumio: document.getElementById('input_trumio').value,
    }
    console.log(data)
    axios.post('http://localhost:8000/update_user', data, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => {
      getUserData().then(()=>setTimeout(()=>setLoading(false), 1000))
    })
  }



  useEffect(() => {        
    getTopics();
    getUserData().then(()=>setLoading(false))
  },[])

  return (
    <section className="grid h-full text-black">
      <main className="flex h-screen flex-col w-full bg-white col-span-4">
        {
          loading ? (
            <div className="w-full h-full">
              <Lottie
                    className="w-full h-full"
                    animationData={loadingAnimation}
                  />
            </div>
          ) : (
            <div className="w-full h-full overflow-y-scroll overflow-x-hidden p-4">

              <h1 className="text-4xl font-bold m-3 mb-6">My Profile</h1> 

              <div className="w-full h-72 relative rounded-xl p-0 m-2 overflow-clip flex justify-center items-center">
                <img src={user.bannerPicUrl} alt="Banner" className="w-full"/>
                <button className="absolute top-2 right-2 bg-blue-200 p-2 rounded-full border-blue-700 border text-blue-700 hover:bg-blue-400">Edit</button>
                <div className="flex flex-row items-center m-2 p-6 rounded-3xl absolute top-auto bottom-auto left-auto right-auto w-2/3 bg-gray-50 bg-opacity-40">
                  <div className="w-36 h-36 relative rounded-full p-0 flex justify-center items-center">
                    <img src={user.profilePicUrl} alt="Profile Pic" className="w-full h-full rounded-full"/>
                    <button className="absolute top-0 left-0 w-full h-full opacity-0 p-2 rounded-full border-blue-700 border text-blue-700 bg-blue-200 hover:opacity-100 transition-opacity">Edit</button>
                  </div>
                  <div className="flex flex-col pl-4 flex-1">
                    <input className="text-xl font-bold w-auto p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-black bg-opacity-40" type="text" defaultValue={user.name} name="name" id="input_name" />
                    <input className="text-xl font-bold p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-gray-600 bg-opacity-40" type="text" defaultValue={user.email} disabled />
                    <div className="flex w-full items-center mt-2">
                      <span className="text-lg ml-2">Current Plan: {user.currentPlan}</span>
                      <button className="ml-auto px-6 flex justify-center items-center space-x-2  bg-black rounded-full py-2 text-white">
                        <IconLightningbolt className="h-5 w-5 mr-2" />
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              

              <div className="m-2 mt-6 bg-gray-50 w-2/3 rounded-lg mx-auto shadow-lg">
                <h2 className="text-2xl font-bold w-full p-6 shadow-[0_15px_10px_-15px_rgba(0,0,0,0.2)]">Other details</h2>
                <div className="grid grid-cols-2 w-full p-6">
                  <div className="flex flex-col p-2">
                    <label htmlFor="input_college" className="p-2">College</label>
                    <input type="text" name="college" id="input_college" className="w-full p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-black" defaultValue={user.college}/>
                  </div>
                  <div className="flex flex-col p-2">
                    <label htmlFor="input_company" className="p-2">Company</label>
                    <input type="text" name="company" id="input_company" className="w-full p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-black" defaultValue={user.company}/>
                  </div>
                  <div className="flex flex-col p-2">
                    <label htmlFor="input_jobTitle" className="p-2">Job Title</label>
                    <input type="text" name="jobTitle" id="input_jobTitle" className="w-full p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-black" defaultValue={user.jobTitle}/>
                  </div>
                  <div className="flex flex-col p-2">
                    <label htmlFor="input_trumio" className="p-2">Trumio Profile URL</label>
                    <input type="text" name="trumio" id="input_trumio" className="w-full p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-hidden text-black" defaultValue={user.trumio}/>
                  </div>
                  <div className="flex flex-col p-2 col-span-2">
                    <label htmlFor="input_jobDesc" className="p-2">Job Description</label>
                    <textarea type="text" name="jobDesc" id="input_jobDesc" className="w-full p-2 rounded-lg border-gray-400 border m-1 bg-gray-200 overflow-y-scroll text-black resize-none" rows={3} defaultValue={user.jobDesc}></textarea>
                  </div>
                </div>
              </div>

              <div className="w-2/3 mx-auto my-8 flex">
                <button className="p-2 w-32 rounded-full border-blue-700 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white ml-auto text-center" onClick={saveDetails}>Save Details</button>
              </div>
            </div>
          )
        }
        
      </main>
    </section>)
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
