import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext'
import HomeIndex from './pages/HomeIndex'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './firebase'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<HomeIndex />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
