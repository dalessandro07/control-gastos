import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext'
import Main from './components/Main'
import useServiceWorker from './hooks/useServiceWorker'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './firebase'

import { ThemeProvider } from '@material-tailwind/react'

const App = () => {
  const { updateSW } = useServiceWorker()
  useEffect(() => updateSW(), [])

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
