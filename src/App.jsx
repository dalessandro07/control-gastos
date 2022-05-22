import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SaldoProvider from './context/SaldoContext'
import HomeIndex from './pages/HomeIndex'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <SaldoProvider>
      <Router>
        <Routes>
          <Route path="*" element={<HomeIndex />} />
        </Routes>
      </Router>
      <ToastContainer />
    </SaldoProvider>
  )
}

export default App
