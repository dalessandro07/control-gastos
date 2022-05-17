import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SaldoProvider from './context/SaldoContext'
import HomeIndex from './pages/HomeIndex'

const App = () => {
  return (
    <SaldoProvider>
      <Router>
        <Routes>
          <Route path="*" element={<HomeIndex />} />
        </Routes>
      </Router>
    </SaldoProvider>
  )
}

export default App
