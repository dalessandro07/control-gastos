import React from 'react'
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'

import SaldoProvider from '../context/SaldoContext'
import { useAuth } from '../context/AuthContext'

import Saldo from '../components/App/Info/Saldo'
import Gastos from '../components/App/Functions/Gastos'
import Login from '../components/Home/Login'
import Register from '../components/Home/Register'
import ProtectedRoute from '../components/App/User/ProtectedRoute'
import ForgotPassword from '../components/Home/ForgotPassword'

const HomeIndex = () => {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between">
        <div className="mx-4 flex items-center gap-5">
          <img
            className="full h-10 w-10 rounded-full"
            src="https://play-lh.googleusercontent.com/V6TSj9QIoCp8-zK9S-PVU8uHfqrTk0dwzvqtmMGSA_s_c3v9LypsfRMQChUNhMyNiQ"
            alt=""
          />

          <h1
            onClick={() => navigateTo('/')}
            className="relative my-6 cursor-pointer text-center font-dosis text-2xl font-bold">
            Allexpenses App
          </h1>
        </div>

        {user && (
          <Link to="/">
            <img
              className="mx-4 h-10 w-10 rounded-full object-cover"
              src={
                user?.photoURL ??
                'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
              }
              alt=""
            />
          </Link>
        )}
      </header>

      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <SaldoProvider>
                <Saldo />
                <Gastos />
              </SaldoProvider>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<Register />} />
      </Routes>

      <footer
        className={
          pathname.includes('login') || pathname.includes('register')
            ? 'flex items-center justify-center'
            : 'flex items-center justify-center bg-gray-100'
        }>
        <p className="mt-5 mb-2 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Allexpenses App
        </p>
      </footer>
    </div>
  )
}

export default HomeIndex
