import React, {useState,useRef} from 'react'
import {useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import imagem from "../../assets/images/FamilyTreeLogo.jpg"

function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { signup } = useAuth()
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
            navigate('/login')
        } catch {
            setError('Failed to create an account')
            alert("Failed to Sign Up")
        }
    }


    return (
        <>
            <section className="flex flex-col md:flex-row h-screen items-center">

                <div className="bg-white hidden lg:flex justify-center w-full md:w-1/2 xl:w-3/5 h-screen">
                    <img src={imagem} alt=""/>
                </div>

                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-2/5 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                    <div className="w-full h-100">

                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12"> Signup to your account</h1>

                        <form className="mt-6" action="#" method="POST">
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
              px-4 py-3 mt-6" onClick={handleSubmit}>Signup</button>
                        </form>

                        <hr className="my-6 border-gray-300 w-full"/>

                  

                        <p className="mt-8">Already have an account? <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold" onClick={() => { navigate('/login') }}>Login</a></p>


                    </div>
                </div>

            </section>
        </>
    )
}

export default Signup