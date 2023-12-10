// External Dependencies
import Lottie from "lottie-react";

// Component Imports
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

// Image and Animation Imports
import animationdata from "../assets//animations/Animation - 1701635048705.json"
import loadingAnimation from "../assets/animations/Animation - 1701802141018.json";
import plus_icon from '../assets/images/plus_icon_black.png';

export default function Dashboard() {
  return (
    <section className="grid h-full text-black grid-cols-5">
      <Sidebar />
      <main className="flex h-full flex-col w-full bg-white col-span-4 p-4">
        <Navbar />
        <div className="w-full h-full">
          <div className="flex  justify-start space-x-8 rounded-lg bg-white w-[95%] h-28  mb-4">
            <Lottie
              animationData={animationdata}
              className=" h-full"
            />
            <div className=" p-4 my-auto ">
              <h1 className="text-4xl my-auto font-semibold">IdeaX Hub </h1>
              <h2 className=" mt-2  font-medium text-[#597ef7] text-lg ">Refine, Explore, and cultivate groundbreaking ideas.</h2>
            </div>
          </div>

          <div className="w-full p-4">
            <div className="flex w-full border-2 rounded-3xl ">
              <div className="w-1/3 h-full py-16 ">
                <Lottie animationData={loadingAnimation} />
              </div>
              <div className="w-2/3 h-full my-auto flex flex-col p-4">
                <div className="w-full p-4 flex justify-center items-center my-2 border rounded-lg flex-1 hover:shadow-xl">
                  <h1 className="text-center font-normal text-lg">Create New Ideas by</h1>
                  <div className="flex justify-center mx-2 border-black border-2 items-center space-x-2 bg-white rounded-full p-2 text-black mt-2">
                    <img src={plus_icon} alt="Plus icon" className="h-5 w-5 mr-2" />
                    New Idea
                  </div>
                </div>
                <div className="w-full p-4 flex justify-center items-center my-2 border rounded-lg flex-1 hover:shadow-xl">
                  <h1 className="text-center font-normal text-lg">Click any existing idea from left panel to open "Idea Dashboard" or go to its "Vision Doc" or "Research Bank"</h1>
                </div>
                <div className="w-full p-4 flex justify-center items-center my-2 border rounded-lg flex-1 hover:shadow-xl">
                  <h1 className="text-center font-normal text-lg">All articles and videos are saved in "Miscellaneous", you can move them to different ideas</h1>
                </div>
                <div className="w-full p-4 flex justify-center items-center my-2 border rounded-lg flex-1 hover:shadow-xl">
                  <h1 className="text-center font-normal text-lg">You can have AI generated problem statements for any idea according to your research bank and requirements</h1>
                </div>
                <div className="w-full p-4 flex justify-center items-center my-2 border rounded-lg flex-1 hover:shadow-xl">
                  <h1 className="text-center font-normal text-lg">Refine, analyze and formalize your idea through "Market Insights" and recommended "Collaborators"</h1>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </section>
  )
}