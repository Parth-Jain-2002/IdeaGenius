import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar(props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <section className="flex items-center justify-between mb-4">
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
        </svg>
        Back
      </button>
      <div className="flex items-center space-x-2 group relative">
        <span className="text-lg">
          {localStorage.getItem("ideagen_logged_in")
            ? localStorage.getItem("ideagen_user_name")
            : ""}
        </span>
        <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd">
          <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
        </svg>
        <div className="group-hover:flex hidden flex-col absolute right-0 top-7 bg-white p-2 text-center rounded-lg shadow-sm">
          <a href="#" className="p-2">
            Profile
          </a>
          {/* TODO: Profile page banana hai */}
          <a
            href="#"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="p-2 text-red-600"
          >
            Log Out
          </a>
        </div>
      </div>
    </section>
  );
}
