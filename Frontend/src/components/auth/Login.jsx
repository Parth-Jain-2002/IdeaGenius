import React, {useState} from 'react'
import {useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import imagem from "../../assets/images/IdeaGenLogo.png"

function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault();
        try {
            await login(email, password)
            navigate('/research')
        } catch {
            alert("Failed to Log in")
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

                            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                            <form className="mt-6" action="#" method="POST">
                                <div>
                                    <label className="block text-gray-700">Email Address</label>
                                    <input type="email" name="" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required/>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input type="password" name="" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" minLength={8} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required/>
                                </div>

                                <div className="text-right mt-2">
                                    <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700" onClick={()=> navigate("/forgot-password")}>Forgot Password?</a>
                                </div>

                                <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6" onClick={handleLogin}>Log In</button>
                            </form>

                            <hr className="my-6 border-gray-300 w-full"/>

                            {/*<button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                                <div className="flex items-center justify-center">
                                    <span className="ml-4">
                                        Log in
                                        with
                                        Google</span>
                                </div>
                            </button>

                            <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                                <div className="flex items-center justify-center">
                                    <span className="ml-4">
                                        Log in
                                        with
                                        Github</span>
                                </div>
                            </button> */}

                            <p className="mt-8">Need an account? <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold" onClick={() => { navigate('/signup') }}>Create an
                                account</a></p>


                        </div>
                    </div>

                </section>
        </>
    )
}

export default Login