import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import SaldoProvider from '../context/SaldoContext'
import DivisasProvider from '../context/DivisasContext'

import Login from './login/Login'
import PhoneNumberLogin from './login/PhoneNumberLogin'
import ForgotPassword from './login/ForgotPassword'
import Register from './register/Register'

import useResizeWindow from '../hooks/useResizeWindow'
import ScreenSize from './error/ScreenSize'

const Header = lazy(() => import('./app/layout/Header'))
const Footer = lazy(() => import('./app/layout/Footer'))
const ProtectedRoute = lazy(() => import('./app/user/ProtectedRoute'))

const Gastos = lazy(() => import('./app/gastos/Gastos'))
const Saldo = lazy(() => import('./app/saldo/Saldo'))

const Main = () => {
  const { width } = useResizeWindow()

  return (
    <>
      {width < 680 ? (
        <div className="flex h-screen flex-col">
          <Header />

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
