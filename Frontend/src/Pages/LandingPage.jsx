import React, {useState} from "react";
import imagem from "../assets/images/IdeaGenLogo.png";
import Lottie from "lottie-react";
import mainAnimation from "../assets/animations/Animation - 1701314100612 (1).json";
import { HiArrowSmDown } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import Pricing from "../components/Layout/Pricing";
import Features from "../components/Layout/Features";
import UseCases from "../components/Layout/UseCases";
import {Link} from "react-router-dom"


export default function LandingPage() {
  const [active, setActive] = useState(false);
  return (
    <div className="bg-[#f4f7fa] py-6 px-5 md:px-10 lg:px-20">
      {/* Navbar */}

      <div className="container flex justify-between max-w-full flex-col lg:flex-row lg:items-center relative">
        {/* Logo and Name */}
        <div className="flex items-center">
          <img
            src={imagem} // Replace with the path to your logo
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-black text-4xl font-semibold">IdeaGen</span>

          <button className="flex lg:hidden w-10 ml-auto" onClick={()=>{setActive(!active)}}>
            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24">
              <path d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z" fillRule="nonzero"/>
            </svg>
          </button>
        </div>

        

        {/* Navbar Links */}
        <div className={`flex items-center justify-center lg:space-x-16 xl:space-x-32 flex-col lg:flex-row transition-all ${active?'h-[60vh] z-50 opacity-100':'h-0 -z-50 opacity-0'} lg:h-auto lg:z-50 lg:opacity-100`}>
          <ScrollLink to="/"  spy={true} smooth={true} offset={-70} duration={500} className="text-black cursor-pointer py-2">
            Home
          </ScrollLink>
          <ScrollLink to="features" spy={true} smooth={true} offset={-70} duration={500} className="text-black cursor-pointer py-2">
            Features
          </ScrollLink>
          <ScrollLink to="usecases" spy={true} smooth={true} offset={-70} duration={500} className="text-black cursor-pointer py-2">
            Use Cases
          </ScrollLink>
          <ScrollLink to="pricing" spy={true} smooth={true} offset={-70} duration={500} className="text-black cursor-pointer py-2">
            Pricing
          </ScrollLink>
        </div>

        {/* User Section */}
        <div className={`flex gap-4 flex-col lg:flex-row justify-center transition-all ${active?'h-[20vh] z-50 opacity-100':'h-0 -z-50 opacity-0'} lg:h-auto lg:z-50 lg:opacity-100`}>
          <Link
            to="/signup"
            className="text-center p-3 border-4 rounded-2xl bg-[#b597f7] "
          >
            Signup
          </Link>
          <Link to="/login" className="text-center p-3 border-4 rounded-2xl bg-[#fecb57] ">
            Login
          </Link>
        
        </div>
      </div>

      <div className="flex justify-between flex-col lg:flex-row items-center text-center lg:text-left">
        {/* Main Animation on the right side */}
        <div className="flex-col gap-10">
          {/* Rest of your landing page content */}
          <h1 className="mt-20 text-6xl sm:text-8xl">Research. </h1>
          <h1 className="mt-2 text-[#4f46e5] text-6xl sm:text-8xl">Smarter.</h1>
          <p className="mt-8 text-normal w-full lg:w-4/5 font-light text-lg">
            A dynamic platform engineered to revolutionize ideation and market
            research processes.
          </p>
          <div className="flex justify-center w-full lg:justify-between">
          <ScrollLink to="usecases" spy={true} smooth={true} offset={-70} duration={500} className="flex cursor-pointer gap-2 mt-10 p-3 border-4 text-white rounded-2xl bg-[#4f46e5] ">
              Use Cases
              <HiArrowSmDown className="text-white w-6 h-6" />
            </ScrollLink>
          </div>

          <div className="container mx-auto px-4">
            {/* Your content goes here */}
          </div>
        </div>

        <div className="flex-none w-[40%] ">
          <Lottie animationData={mainAnimation} className="w-full h-full" />
        </div>
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="usecases">
        <UseCases />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
    
    </div>
  );
};