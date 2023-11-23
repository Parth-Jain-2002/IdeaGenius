import React, {useContext,useState,useEffect} from 'react'
import {auth,db} from '../config/firebaseConfig.jsx'
import {collection,doc,setDoc} from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password,username) {
        return auth.createUserWithEmailAndPassword(email, password).then(
            (user)=>{
                db.collection("Client").doc(user.user.uid).set({
                    email: email,
                    name: username,
                })
            }              
        )
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password).then((user)=>{
            console.log(user.user.uid)
            localStorage.setItem("ideagen_logged_in",true)
            localStorage.setItem("ideagen_user_id",user.user.uid)
        })
    }

    function logout(){
        return auth.signOut().then(()=>{
            localStorage.setItem("ideagen_logged_in",false)
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
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}