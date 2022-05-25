import React, { useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { SaldoContext } from '../context/SaldoContext'

import Saldo from '../components/App/Info/Saldo'
import Gastos from '../components/App/Functions/Gastos'
import Login from '../components/Home/Login'
import Register from '../components/Home/Register'
import Page404 from '../utilities/Page404'
import ProtectedRoute from '../components/App/User/ProtectedRoute'
import ForgotPassword from '../components/Home/ForgotPassword'

const HomeIndex = () => {
  const navigateTo = useNavigate()
  const { gastos, saldoTotal } = useContext(SaldoContext)

  return (
    <div className="flex h-screen flex-col">
      <header>
        <h1
          onClick={() => navigateTo('/app')}
          className="relative my-6 cursor-pointer text-center font-dosis text-4xl font-bold">
          Control de gastos
        </h1>
      </header>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Page404 />} />

        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <Saldo saldoTotal={saldoTotal} />
              <Gastos gastos={gastos} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default HomeIndex
