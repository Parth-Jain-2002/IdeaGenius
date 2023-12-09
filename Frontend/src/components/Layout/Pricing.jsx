import React from "react";

export default function Pricing() {
  return (
    <section class="bg-[#f4f7fa] ">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class=" mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Pricing
          </h2>
          <p class="text-gray-500 mt-4 text-justify sm:text-xl ">
            Choose a plan that aligns with your project needs, whether you're a
            solo entrepreneur, a student team, or a corporate innovator. Enjoy
            the freedom to scale resources as your project evolves, ensuring a
            tailored and cost-effective experience. Explore our pricing tiers
            below to discover the perfect fit for unlocking the full potential
            of your ideas."
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
            <h3 class="mb-4 text-2xl font-semibold">Free</h3>
            <p class="font-light text-gray-500 sm:text-lg ">
            Spark ideas with us for smooth ideation and market research
            </p>
            <div class="flex justify-center items-baseline my-8">
              <span class="mr-2 text-5xl font-extrabold">$0</span>
              <span class="text-gray-500 ">/month</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left text-sm">
              <li><span className="font-semibold text-base">Free</span> Includes:</li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Individual configuration</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span><span class="font-semibold">Explore a vast library</span> of research insights</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                    <span class="font-semibold">Effortlessly generate ideas</span> with IdeaX
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Visualize your projects </span> in Vision Doc
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Connect with </span> like minded people
                </span>
              </li>
            </ul>
            <a
              href="#"
              class="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Get started
            </a>
          </div>

          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
            <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
            <p class="font-light text-gray-500 sm:text-lg ">
            Best option for personal use & for your next project.
            </p>
            <div class="flex justify-center items-baseline my-8">
              <span class="mr-2 text-5xl font-extrabold">$15</span>
              <span class="text-gray-500 ">/month</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left text-sm">
              <li className="text-base">Everything in <span className="font-semibold">Free</span>, plus:</li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Research Bank + <span className="font-semibold">chat interface</span></span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span><span className="font-semibold">Stay ahead with curated </span> market insights</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Plan your projects </span> with VisionX and Vision Doc premium features
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold"> Turn ideas into action </span> with Trumio integration
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Enjoy 12 months of priority support</span>
                </span>
              </li>
            </ul>
            <a
              href="#"
              class="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Get started
            </a>
          </div>

          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
            <h3 class="mb-4 text-2xl font-semibold">Pro</h3>
            <p class="font-light text-gray-500 sm:text-lg ">
              Relevant for multiple users, extended & premium support.
            </p>
            <div class="flex justify-center items-baseline my-8">
              <span class="mr-2 text-5xl font-extrabold">$120</span>
              <span class="text-gray-500 ">/month</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left text-sm">
            <li className="text-base">Everything in <span className="font-semibold">Starter</span>, plus:</li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                <span className="font-semibold">
                  Seamless collaboration
                </span> with team
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                <span class="font-semibold">Get exclusive market insights </span> for informed decisions</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Protect your data </span> with enhanced security features
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Team : </span> 10 developers
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  <span class="font-semibold">Enjoy 18 months of priority support</span>
                </span>
              </li>
            </ul>
            <a
              href="#"
              class="text-white bg-[#4f46e5] focus:ring-4 focus:ring-[#cecae1] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
