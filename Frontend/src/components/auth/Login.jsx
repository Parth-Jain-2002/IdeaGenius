import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/Animation - 1701440987559.json";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Failed to Log in");
    }
  }

  async function handleSubmitGoogle() {
    try {
      //setError('')
      await loginWithGoogle();
      navigate("/dashboard");
    } catch {
      //setError('Failed to login with google')
      alert("Failed to Sign Up");
    }
  }

  return (
    <div className="flex gap-4 h-screen">
      <Lottie
        className="bg-white hidden lg:flex justify-center mr-10 md:w-1/2 xl:w-[40%] h-screen"
        animationData={animationData}
      />

      <div className="bg-white w-full border-2 rounded-2xl md:max-w-md lg:max-w-full mx-auto md:w-1/2 xl:w-1/3 my-auto px-6 lg:px-16 xl:px-12 items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold mt-12">
            {" "}
            Login to your account
          </h1>

          <form className="mt-6 w-full" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="true"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
                minLength={8}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="true"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
      px-4 py-2 mt-4"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="mt-4 text-grey-600">
              Don't have an account?{" "}
              <span>
                <Link
                  to="/signup"
                  className="text-purple-600 hover:underline"
                  href="#"
                >
                  Sign Up
                </Link>
              </span>
            </div>

            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 ">OR</p>
              <hr className="w-full" />
            </div>
            <div className="my-6 space-y-4">
              <button
                onClick={handleSubmitGoogle}
                aria-label="Login with Google"
                type="button"
                className="flex items-center text-white justify-center w-full p-2 space-x-4 border rounded-md bg-indigo-500 hover:bg-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5  fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    //                 <div className="flex gap-4 h-auto">

    //                 <Lottie  className="bg-white hidden lg:flex justify-center mr-10 md:w-2/3 xl:w-[40%] h-screen" animationData={animationData} />

    //                     <div className="bg-white border-2 rounded-2xl md:w-4/5 xl:w-2/5 h-screen
    //         items-center justify-center">

    //                         <div className="w-full h-100">

    //                             <h1 className="text-xl md:text-2xl font-bold mt-12">Log in to your account</h1>

    //                             <form className="mt-6 w-3/5" action="#" method="POST">
    //                                 <div>
    //                                     <label className="block text-gray-700">Email Address</label>
    //                                     <input type="email" name="" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required/>
    //                                 </div>

    //                                 <div className="mt-4">
    //                                     <label className="block text-gray-700">Password</label>
    //                                     <input type="password" name="" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" minLength={8} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
    //                 focus:bg-white focus:outline-none" required/>
    //                                 </div>

    //                                 <div className="text-right mt-2">
    //                                     <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700" onClick={()=> navigate("/forgot-password")}>Forgot Password?</a>
    //                                 </div>

    //                                 <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
    //               px-4 py-3 mt-6" onClick={handleLogin}>Log In</button>
    //                             </form>

    //                             <hr className="my-6 border-gray-300 w-full"/>

    //                             {/*<button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
    //                                 <div className="flex items-center justify-center">
    //                                     <span className="ml-4">
    //                                         Log in
    //                                         with
    //                                         Google</span>
    //                                 </div>
    //                             </button>

    //                             <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
    //                                 <div className="flex items-center justify-center">
    //                                     <span className="ml-4">
    //                                         Log in
    //                                         with
    //                                         Github</span>
    //                                 </div>
    //                             </button> */}

    // <div className="mt-4 text-grey-600">
    //                         Don't have an account?{" "}
    //                         <span>
    //                             <Link to="/signup" className="text-purple-600 hover:underline" href="#">
    //                                 Sign Up
    //                             </Link>
    //                         </span>
    //                     </div>
    //                     <div className="flex items-center w-full my-4">
    //                         <hr className="w-32" />
    //                         <p className=" ">OR</p>
    //                         <hr className="w-32" />
    //                     </div>
    //                     <div className="my-6 space-y-4" >
    //                         <button
    //                         onClick={handleSubmitGoogle}
    //                             aria-label="Login with Google"
    //                             type="button"
    //                             className="flex items-center text-white justify-center w-full p-2 space-x-4 border rounded-md bg-indigo-500 hover:bg-indigo-500"
    //                             >
    //                             <svg
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                                 viewBox="0 0 32 32"
    //                                 className="w-5 h-5  fill-current"
    //                             >
    //                                 <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
    //                             </svg>
    //                             <p>Login with Google</p>
    //                         </button>
    //                     </div>

    //                         </div>
    //                     </div>

    //                 </div>
  );
}