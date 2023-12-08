import React from 'react'
import Login from './components/auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import AuthProvider from './contexts/AuthContext'
import Dashboard from './Pages/Dashboard'
import MyProfile from './Pages/MyProfile'
import ResearchBank from './Pages/ResearchBank'
import ChatInterface from './Pages/ChatInterface'
import IdeaInterface from './Pages/IdeaInterface'
import LandingPage from './Pages/LandingPage'
import { Navigate } from 'react-router-dom'
import MarketInsight from './Pages/MarketInsight'
import VisionDoc from './Pages/VisionDoc'
import People from './Pages/People'


const ProtectedRoute = ({children}) => {
  const isLoggedIn = localStorage.getItem("ideagen_logged_in")
  return isLoggedIn ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/research/:ideaid" element={<ProtectedRoute><ResearchBank /></ProtectedRoute>} />
            <Route path="/chat/:chatid" element={<ProtectedRoute><ChatInterface /></ProtectedRoute>} />
            <Route path="/idea/:ideaid" element={<ProtectedRoute><IdeaInterface/></ProtectedRoute>} />
            <Route path="/market-insight/:ideaid" element={<ProtectedRoute><MarketInsight /></ProtectedRoute>} />
            <Route path="/vision-doc/:ideaid" element={<ProtectedRoute><VisionDoc/></ProtectedRoute>} />
            <Route path="/people/:ideaid" element={<ProtectedRoute><People/></ProtectedRoute>} />
          
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

