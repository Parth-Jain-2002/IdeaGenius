import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  
  return (
    <section className="flex items-center justify-between mb-4">
      <button onClick={() => { navigate(-1) }} className="flex flex-row" title="Go Back">
        <svg className="w-6 h-6" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" /></svg>
        Back
      </button>
      <div className="flex items-center space-x-2">
        <span className="text-lg">{localStorage.getItem("ideagen_logged_in") ? localStorage.getItem("ideagen_user_name") : ""}</span>
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
      </div>
    </section>
  )
}