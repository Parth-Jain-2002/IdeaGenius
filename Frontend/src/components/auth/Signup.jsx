import React, {useState,useRef} from 'react'
import {useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import imagem from "../../assets/images/IdeaGenLogo.png"
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/Animation - 1701313508796.json";
function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { signup, loginWithGoogle } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    

    async function handleSubmit(e){
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
            navigate('/research')
        } catch {
            setError('Failed to create an account')
            alert("Failed to Sign Up")
        }
    }

    async function handleSubmitGoogle(e){

        try {
            setError('')
            await loginWithGoogle()
            navigate('/research')
        } catch {
            setError('Failed to login with google')
            alert("Failed to Sign Up")
        }
    }


    return (
            <div className="flex gap-4 h-auto">



                <Lottie className="bg-white hidden lg:flex justify-center mr-10 md:w-1/2 xl:w-[40%] h-screen" animationData={animationData} />
                
             

                <div className="bg-white w-full border-2 rounded-2xl md:max-w-md lg:max-w-full md:mx-6 md:w-1/2 xl:w-2/5 h-screen px-6 lg:px-16 xl:px-12
        items-center justify-center">

                    <div className="w-full h-100">

                        <h1 className="text-xl md:text-2xl font-bold mt-12"> Signup to your account</h1>

                        <form className="mt-6 w-5/6" action="#" method="POST">
                            {error && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">Holy smokes!</strong>
                            <span class="block sm:inline">Something seriously bad happened.</span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                            </div>
                            </div>
                            }
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input ref={nameRef} type="text" name="" id="email" placeholder="Enter name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input ref={emailRef} type="email" name="" id="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input ref={passwordRef} type="password" name="" id="email" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required/>
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Confirm Password</label>
                                <input ref={passwordConfirmRef} type="password" name="" id="password" placeholder="Enter password (again)" minLength={8} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required/>
                            </div>

                            <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-2 mt-4" onClick={handleSubmit}>Signup</button>
                <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link to="/login" className="text-purple-600 hover:underline" href="#">
                                Log in
                            </Link>
                        </span>
                    </div>

<div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-4" >
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

                        <hr className="my-6 border-gray-300 w-full"/>

                  

                      
                    </div>
                </div>

            </div>
     
    )
}

export default Signup