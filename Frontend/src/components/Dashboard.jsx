import React from 'react'
import { Link } from 'react-router-dom'
import FamilyTreeDashboard from '../assets/images/FamilyTreeDashboard.jpg'

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className=" h-6 w-6 text-gray-900 dark:text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="16" rx="2" width="20" x="2" y="4" />
              <path d="M10 4v4" />
              <path d="M2 8h20" />
              <path d="M6 4v4" />
            </svg>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">VanshSparsh</h1>
          </div>
          <nav className="space-x-4">
            <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Dashboard
            </Link>
            <Link to="../family-tree" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Family Tree
            </Link>
            <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Family Events
            </Link>
            <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" href="#">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">Username</span>
            <svg
              className=" h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <button class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border border-gray-600 hover:border-gray-900 dark:border-gray-300 dark:hover:border-white px-4 py-2 rounded">
                <Link to="../login">Logout</Link>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 px-4">
          <h2 className="text-4xl mb-4 font-bold text-center text-gray-900 dark:text-white">Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-1">Your Family Tree</h3>
              <img
                alt="Family tree chart"
                className="mx-auto"
                height="250"
                src={FamilyTreeDashboard}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="250"
              />
              <button class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to="../family-tree">View Tree</Link>
                </button>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
              <img
                alt="Event calendar"
                className="mx-auto"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <button class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View All
                </button>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
              <img
                alt="Message icon"
                className="mx-auto"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <button class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View All
               </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400">© 2023 VanshSparsh. All rights reserved.</p>
          <nav className="space-x-4">
            <Link to="tandc" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
              Terms & Conditions
            </Link>
            <Link to="privacy-policy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard