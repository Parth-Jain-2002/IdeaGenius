import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import imagem from "../../assets/images/IdeaGenLogo.png";

/**
 * This component is the forgot password page where the 
 * user can request for an email to reset their password
 * @returns {React.Component} The forgot password page
 */
export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  /**
   * Async function to send reset password email and redirect to home
   * @param {Event} e The button press event
   */
  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      await resetPassword(email);
      navigate("/login");
    } catch {
      alert("Failed to send reset mail");
    }
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white hidden lg:flex justify-center w-full md:w-1/2 xl:w-3/5 h-screen">
        <img src={imagem} alt="" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-2/5 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Reset Password
          </h1>

          <form className="mt-6" action="#" method="POST">
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

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              onClick={handleResetPassword}
            >
              Send Reset Mail
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
