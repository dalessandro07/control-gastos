import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext'
import Main from './components/Main'

import { ThemeProvider } from '@material-tailwind/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-phone-number-input/style.css'

import './firebase'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="*" element={<Main />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
