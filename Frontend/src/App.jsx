import React from 'react'
import Login from './components/auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import AuthProvider from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import ResearchBank from './components/ResearchBank'
import ChatInterface from './components/ChatInterface'
import IdeaInterface from './components/IdeaInterface'
import LandingPage from './components/LandingPage'
import { Navigate } from 'react-router-dom'

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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/research" element={<ProtectedRoute><ResearchBank /></ProtectedRoute>} />
            <Route path="/chat/:chatid" element={<ProtectedRoute><ChatInterface /></ProtectedRoute>} />
            <Route path="/idea/:ideaid" element={<ProtectedRoute><IdeaInterface/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

