import React from 'react'
import Login from './components/auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import AuthProvider from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import ResearchBank from './components/ResearchBank'
import ChatInterface from './components/ChatInterface'

export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/research" element={<ResearchBank/>} />
            <Route path="/chat" element={<ChatInterface/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

