import React from "react";
import { Link } from "react-router-dom";

/**
 * This is the Pricing Section for the landing page
 * @returns {React.Component} Pricing Section
 */
export default function Pricing() {
  return (
    <section className="bg-[#f4f7fa]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Pricing
          </h2>
          <p className="text-gray-500 mt-4 text-justify sm:text-xl">
            Choose a plan that aligns with your project needs, whether you're a
            solo entrepreneur, a student team, or a corporate innovator. Enjoy
            the freedom to scale resources as your project evolves, ensuring a
            tailored and cost-effective experience. Explore our pricing tiers
            below to discover the perfect fit for unlocking the full potential
            of your ideas."
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Free</h3>
            <p className="font-light text-gray-500 sm:text-lg">
              Spark ideas with us for smooth ideation and market research
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$0</span>
              <span className="text-gray-500">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left text-sm">
              <li><span className="font-semibold text-base">Free</span> Includes:</li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span><span className="font-semibold">Explore a vast library</span> of research insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Effortlessly generate ideas</span> with IdeaX
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Visualize your projects </span> in Vision Doc
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Connect with </span> like minded people
                </span>
              </li>
            </ul>
            <Link
              to="/login"
              className="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </Link>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
            <p className="font-light text-gray-500 sm:text-lg">
              Best option for personal use & for your next project.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$15</span>
              <span className="text-gray-500">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left text-sm">
              <li className="text-base">Everything in <span className="font-semibold">Free</span>, plus:</li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>Research Bank + <span className="font-semibold">chat interface</span></span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span><span className="font-semibold">Stay ahead with curated </span> market insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Plan your projects </span> with VisionX and Vision Doc premium features
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold"> Turn ideas into action </span> with Trumio integration
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Enjoy 12 months of priority support</span>
                </span>
              </li>
            </ul>
            <Link
              to="/login"
              className="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </Link>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">Company</h3>
            <p className="font-light text-gray-500 sm:text-lg">
              Relevant for multiple users, extended & premium support.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$120</span>
              <span className="text-gray-500">/month</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left text-sm">
              <li className="text-base">Everything in <span className="font-semibold">Starter</span>, plus:</li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">
                    Seamless collaboration
                  </span> with team
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Get exclusive market insights </span> for informed decisions</span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Protect your data </span> with enhanced security features
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Team : </span> 10 developers
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <GreenCheck />
                <span>
                  <span className="font-semibold">Enjoy 18 months of priority support</span>
                </span>
              </li>
            </ul>
            <Link
              to="/login"
              className="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Green Checkmark SVG Icon
 * @returns {React.Component} svg icon
 */
function GreenCheck() {
  return (
    <svg
      className="flex-shrink-0 w-5 h-5 text-green-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
