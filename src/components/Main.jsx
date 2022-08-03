import React from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import SaldoProvider from '../context/SaldoContext'
import DivisasProvider from '../context/DivisasContext'
import { useAuth } from '../context/AuthContext'

import Saldo from './app/info/Saldo'
import Gastos from './app/functions/Gastos'

import Login from './login/Login'
import PhoneNumberLogin from './login/PhoneNumberLogin'
import Register from './register/Register'

import ProtectedRoute from './app/user/ProtectedRoute'
import ForgotPassword from './login/ForgotPassword'
import useResizeWindow from '../hooks/useResizeWindow'
import ScreenSize from './error/ScreenSize'
import Footer from './utils/Footer'

const Main = () => {
  const navigateTo = useNavigate()
  const { user } = useAuth()
  const { width } = useResizeWindow()

  return (
    <>
      {width < 680 ? (
        <div className="flex h-screen flex-col">
          <header className="flex items-center justify-between">
            <div className="mx-4 flex items-center gap-5">
              <img
                onClick={() => navigateTo('/')}
                className="full h-10 w-10 cursor-pointer rounded-full"
                src="https://play-lh.googleusercontent.com/V6TSj9QIoCp8-zK9S-PVU8uHfqrTk0dwzvqtmMGSA_s_c3v9LypsfRMQChUNhMyNiQ"
                alt=""
              />

              <h1
                onClick={() => navigateTo('/')}
                className="relative my-6 cursor-pointer text-center font-dosis text-2xl font-bold">
                AllExpenses
              </h1>
            </div>

            {user && (
              <Link to="/">
                {user?.photoURL ? (
                  <img
                    className="mx-4 h-9 w-9 rounded-full object-cover"
                    src={user?.photoURL}
                    alt=""
                  />
                ) : (
                  <div className="mx-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                    <p className="text-2xl text-white">{user?.displayName?.at(0) ?? 'U'}</p>
                  </div>
                )}
              </Link>
            )}
          </header>

          <Routes>
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <DivisasProvider>
                    <SaldoProvider>
                      <Saldo />
                      <Gastos />
                    </SaldoProvider>
                  </DivisasProvider>
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register" element={<Register />} />

            <Route path="/phone-number" element={<PhoneNumberLogin />} />
          </Routes>

          <Footer />
        </div>
      ) : (
        <ScreenSize />
      )}
    </>
  )
}

export default Main
