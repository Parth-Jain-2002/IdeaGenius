import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider } from "../config/firebaseConfig.jsx";

/**
 * This is the context that will be used to manage the user's authentication state.
 */
const AuthContext = React.createContext();

/**
 * This hook is used to access the user's authentication state.
 * @returns {Object} The user's authentication state.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * This component is used to wrap the application and provide the user's authentication state.
 * @param {Object} children The child components of the application. 
 * @returns {Object} The authentication provider
 */
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * This function signs up a user with the given email, password, and username.
   * @param {string} email The user's email
   * @param {string} password The user's password
   * @param {string} username The user's name
   * @returns {Object} The user's firebase credentials
   */
  async function signup(email, password, username) {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    const user_id = user.uid;
    const user_email = user.email;

    // Update all details in the database
    await axios
      .post("http://localhost:8000/new_user", {
        _id: user_id,
        email: user_email,
        name: username,
      })
      .then(
        (response) => {
          //console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    return userCredential;
  }

  /**
   * This function logs in a user with the given email and password
   * @param {string} email The user's email
   * @param {string} password The user's password
   * @returns {Object} The user's firebase credentials
   */
  async function login(email, password) {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    const user_id = user.uid;
    const user_email = user.email;

    // Update all details in the database
    await axios
      .get(`http://localhost:8000/get_user`, {
        params: {
          userid: user_id,
        },
      })
      .then(
        (response) => {
          localStorage.setItem("ideagen_user_name", response.data.name);
        },
        (error) => {
          console.log(error);
        }
      );

    localStorage.setItem("ideagen_logged_in", true);
    localStorage.setItem("ideagen_user_id", user_id);
    localStorage.setItem("ideagen_user_email", user_email);

    return userCredential;
  }

  /**
   * This function lets the user log in with their Google account
   */
  async function loginWithGoogle() {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;

      // You can handle the user data as needed
      const user_id = user.uid;
      const user_email = user.email;
      const user_displayName = user.displayName;
      const user_pic = user.photoURL;
      //console.log(user_id);

      // Update all details in localStorage for quick access
      localStorage.setItem("ideagen_logged_in", true);
      localStorage.setItem("ideagen_user_id", user_id);
      localStorage.setItem("ideagen_user_email", user_email);
      localStorage.setItem("ideagen_user_name", user_displayName);
      localStorage.setItem("ideagen_user_pic", user_pic);

      // Update all details in the database
      await axios
        .post("http://localhost:8000/new_user", {
          _id: user_id,
          email: user_email,
          name: user_displayName,
        })
        .then(
          (response) => {
            // console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  /**
   * This function logs out the user
   */
  function logout() {
    return auth.signOut().then(() => {
      // Remove all details from localStorage
      localStorage.setItem("ideagen_logged_in", false);
      localStorage.setItem("ideagen_user_id", "");
      localStorage.setItem("ideagen_user_email", "");
      localStorage.setItem("ideagen_user_name", "");
      localStorage.setItem("ideagen_user_pic", "");
    });
  }

  /**
   * This function sends a password reset email to the user
   * @param {string} email The user's email
   */
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // This hook keeps all children updated with the current user's authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // The functions provided to the children to interact with authentication state
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
