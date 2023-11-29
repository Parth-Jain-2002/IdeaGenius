import React, { useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../config/firebaseConfig.jsx'; // Assuming you have a googleProvider
import { collection, doc, setDoc } from 'firebase/firestore';
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    async function signup(email, password, username) {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        const user = userCredential.user
        const user_id = user.uid
        const user_email = user.email
        
        await axios.post('http://localhost:8000/new_user', {
            _id: user_id,
            email: user_email,
            name: username
        }).then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })

        return userCredential
    }

    async function login(email, password) {
        const userCredential = await auth.signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        const user_id = user.uid
        const user_email = user.email

        await axios.get(`http://localhost:8000/get_user`,{
            params:{
                userid: user_id
            }
        }).then((response) => {
            localStorage.setItem("ideagen_user_name",response.data.name)
        }, (error) => {
            console.log(error)
        })

        localStorage.setItem("ideagen_logged_in",true)
        localStorage.setItem("ideagen_user_id",user_id)
        localStorage.setItem("ideagen_user_email",user_email)

        return userCredential
    }
    
    async function loginWithGoogle() {
        try {
          const result = await auth.signInWithPopup(googleProvider);
          const user = result.user;
    
          // You can handle the user data as needed
          const user_id = user.uid;
          const user_email = user.email;
          const user_displayName = user.displayName; 

          console.log(user_id)

          localStorage.setItem('ideagen_logged_in', true);
          localStorage.setItem('ideagen_user_id', user_id);
          localStorage.setItem('ideagen_user_email', user_email);
          localStorage.setItem('ideagen_user_name', user_displayName);
    
          await axios.post('http://localhost:8000/new_user', {
                _id: user_id,
                email: user_email,
                name: user_displayName
            }).then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })

        } catch (error) {
          console.error('Error signing in with Google', error);
        }
      }

    function logout(){
        return auth.signOut().then(()=>{
            localStorage.setItem("ideagen_logged_in",false)
            localStorage.setItem("ideagen_user_id","")
            localStorage.setItem("ideagen_user_email","")
            localStorage.setItem("ideagen_user_name","")
        })
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userInfo,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        loginWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}