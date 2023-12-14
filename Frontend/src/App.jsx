import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import NewIdeaModal from './components/modals/NewIdeaModal';
import AuthProvider from './contexts/AuthContext';
import NavProvider from './contexts/NavContext';
import NewIdeaModalProvider from './contexts/NewIdeaModalContext';

import Dashboard from './Pages/Dashboard';
import IdeaDashboard from './Pages/IdeaDashboard';
import MyProfile from './Pages/MyProfile';
import ResearchBank from './Pages/ResearchBank';
import ChatInterface from './Pages/ChatInterface';
import IdeaInterface from './Pages/IdeaInterface';
import LandingPage from './Pages/LandingPage';
import MarketInsight from './Pages/MarketInsight';
import VisionDoc from './Pages/VisionDoc';
import People from './Pages/People';
import LearningPathQuestions from "./Pages/LearningPathQuestions"

import TestPath from './Pages/TestPath';

/**
 * This component is used to create a protected route that can only be accessed if the user is authenticated
 * @param {{children: React.Component}} children The main component to show if user is authenticated
 * @returns {React.Component} The component if user is authenticated, else redirects to login page
 */
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("ideagen_logged_in");
  return isLoggedIn == 'true' ? children : <Navigate to="/login" />;
}

/**
 * This component is used to provide the user's authentication state, and to route the user to the correct page
 * @returns {React.Component} The main application component
 */
export default function App() {
  return (
    <div>
      <AuthProvider>
        <NavProvider>
          <NewIdeaModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/:ideaid" element={<ProtectedRoute><IdeaDashboard /></ProtectedRoute>} />
                <Route path="/research/:ideaid" element={<ProtectedRoute><ResearchBank /></ProtectedRoute>} />
                <Route path="/chat/:chatid" element={<ProtectedRoute><ChatInterface /></ProtectedRoute>} />
                <Route path="/idea/:ideaid" element={<ProtectedRoute><IdeaInterface /></ProtectedRoute>} />
                <Route path="/market-insight/:ideaid" element={<ProtectedRoute><MarketInsight /></ProtectedRoute>} />
                <Route path="/vision-doc/:ideaid" element={<ProtectedRoute><VisionDoc /></ProtectedRoute>} />
                <Route path="/people/:ideaid" element={<ProtectedRoute><People /></ProtectedRoute>} />
                <Route path="/learning-path-generator/:ideaid" element={<LearningPathQuestions />} />
                
                <Route path="/test-path" element={<TestPath />} />
                
              </Routes>
            </BrowserRouter>
            <NewIdeaModal />
          </NewIdeaModalProvider>
        </NavProvider>
      </AuthProvider>
    </div>
  );
}
