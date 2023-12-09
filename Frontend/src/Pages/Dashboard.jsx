// External Dependencies
import Lottie from "lottie-react";

// Component Imports
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

// Image and Animation Imports
import animationdata from "../assets//animations/Animation - 1701635048705.json"
import loadingAnimation from "../assets/animations/Animation - 1701802141018.json";
import plus_icon from '../assets/images/plus_icon_black.png';

// Carousel and Accordion Components
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

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
      </main>
    </section>
  )
}