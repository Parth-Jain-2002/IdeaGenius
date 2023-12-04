
import React from 'react';
import imagem from "../assets/images/IdeaGenLogo.png"
import Lottie from "lottie-react";
import mainAnimation from "../assets/animations/Animation - 1701314100612 (1).json";
import { HiArrowSmDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import Pricing from '../components/Layout/Pricing';
import Features from '../components/Layout/Features';
const LandingPage = () => {
  return (
    <div className='bg-[#f4f7fa] py-6 px-20 '>
      {/* Navbar */}
    
        <div className="container flex items-center justify">
          {/* Logo and Name */}
          <div className="flex items-center">
            <img
              src={imagem}  // Replace with the path to your logo
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-black text-4xl font-semibold">IdeaGen</span>
          </div>

          {/* Navbar Links */}
          <div className="flex items-center space-x-32">
            <a href="#" className="text-black">Home</a>
            <a href="#" className="text-black">Features</a>
            <a href="#" className="text-black">Use Cases</a>
            <a href="#" className="text-black">Pricing</a>
          </div>

          {/* User Section */}
          <div className='flex gap-4'>
            <Link to="/signup" className=' p-3 border-4 rounded-2xl bg-[#b597f7] '>Signup</Link>
          <Link to="/login" className=' p-3 border-4 rounded-2xl bg-[#fecb57] '>Login</Link>
          </div>
          
        </div>
     
<div className='flex justify-between '>
  {/* Main Animation on the right side */}
  <div className="flex-col gap-10">
        {/* Rest of your landing page content */}
        <h1 className='mt-20 text-8xl'>Research. </h1>
        <h1 className='mt-2 text-[#4f46e5] text-8xl'>Smarter.</h1>
        <p className='mt-8 text-normal w-4/5 font-light text-lg'>A dynamic platform engineered to revolutionize ideation and market research processes.
</p>
<div className='flex justify-between'>
            <button className='flex gap-2 mt-10 p-3 border-4 text-white rounded-2xl bg-[#4f46e5] '>
              Use Cases
              <HiArrowSmDown className='text-white w-6 h-6' />
              </button>
          </div>

        <div className="container mx-auto px-4">
          {/* Your content goes here */}
        </div>
      </div>

      <div className="flex-none w-[40%] ">
        <Lottie
          animationData={mainAnimation}
          className="w-full h-full"
        />
      </div>
</div>
<div>
<Features/>
</div>
<div>
<Pricing />
</div>
     
    </div>
  );
};

export default LandingPage;
