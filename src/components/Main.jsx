import React, { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProtectedRoute from './App/User/ProtectedRoute'

import SaldoProvider from '../context/SaldoContext'
import DivisasProvider from '../context/DivisasContext'
import ColorProvider from './../context/ColorContext'

import Login from './login/Login'
import PhoneNumberLogin from './login/PhoneNumberLogin'
import ForgotPassword from './login/ForgotPassword'
import Register from './register/Register'

import useResizeWindow from '../hooks/useResizeWindow'
import ScreenSize from './error/ScreenSize'

import Header from './App/layout/Header'
import Navigation from './App/layout/Navigation'
import Footer from './App/layout/Footer'
import Loading from './utils/Loading'

const GastosMainContainer = lazy(() => import('./App/gastos/GastosMainContainer'))
const Saldo = lazy(() => import('./App/saldo/Saldo'))

const Main = () => {
  const { isMobile } = useResizeWindow()
  const { pathname } = useLocation()

  return (
    <>
      {isMobile ? (
        <div className="flex h-screen flex-col">
          <ColorProvider>
            <Header />

            <Routes>
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <DivisasProvider>
                      <SaldoProvider>
                        <Suspense fallback={<Loading />}>
                          <Saldo />
                          <GastosMainContainer />
                          <Navigation />
                        </Suspense>
                      </SaldoProvider>
                    </DivisasProvider>
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/phone-number" element={<PhoneNumberLogin />} />

              <Route path="/register" element={<Register />} />
            </Routes>
          </ColorProvider>
          {pathname.includes('login') || pathname.includes('register') ? <Footer /> : null}
        </div>
      ) : (
        <ScreenSize />
      )}
    </>
  )
}

export default Main
