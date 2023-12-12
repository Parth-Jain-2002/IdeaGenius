import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNav } from "../../contexts/NavContext";
import usericon from "../../assets/images/user.png";


/**
 * This is the common navbar for all of the pages (except the home page)
 * @param {{link: string}} props Properties for Navbar
 * @returns {React.Component} Navbar
 */
export default function Navbar(props) {
  const navigate = useNavigate();
  const { showSidebar, setShowSidebar } = useNav();
  const { logout } = useAuth();

  return (
    <section className="flex items-center justify-center mb-4">
      <button
        onClick={() => {
          setShowSidebar(!showSidebar)
        }}
        className={`flex flex-row xl:hidden ${(props.noBurger)?'hidden':''}`}
        title="Open Sidebar"
      >
        <svg 
          className="w-6 h-6"
          clipRule="evenodd" 
          fillRule="evenodd" 
          strokeLinejoin="round" 
          strokeMiterlimit="2" 
          viewBox="0 0 24 24"
        >
          <path fillRule="nonzero" d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z" />
        </svg>
      </button>
      <button
        onClick={() => {
          navigate(props.link ? props.link : -1);
        }}
        className="flex flex-row"
        title="Go Back"
      >
        <svg
          className="w-6 h-6"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
        >
          <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
        </svg>
        Back
      </button>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-2 group relative">
        <span className="text-lg">
          {localStorage.getItem("ideagen_logged_in")
            ? localStorage.getItem("ideagen_user_name")
            : ""}
        </span>
        <>
          {localStorage.getItem("ideagen_user_pic") ? (<img className="w-8 h-8 rounded-full" src={localStorage.getItem("ideagen_user_pic")} />)
            : (<img className="w-8 h-8 rounded-full" src={usericon} />)}
        </>

        <div className="group-hover:flex hidden flex-col absolute right-0 top-7 bg-white text-center rounded-lg shadow-lg z-50">
          <Link to="/my-profile" className="p-4 hover:bg-gray-200 rounded-lg">
            Profile
          </Link>
          <button
            onClick={() => {
              navigate("/");
              logout();
            }}
            className="p-4 text-red-600 hover:bg-gray-200 rounded-lg"
          >
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
}
