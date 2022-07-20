import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'

import SaldoProvider from '../context/SaldoContext'
import { useAuth } from '../context/AuthContext'

import Saldo from '../components/App/Info/Saldo'
import Gastos from '../components/App/Functions/Gastos'

import Login from './Login/Login'
import Register from './Register/Register'

import ProtectedRoute from '../components/App/User/ProtectedRoute'
import ForgotPassword from '../components/Home/ForgotPassword'
import PhoneNumberLogin from './Login/PhoneNumberLogin'
import DivisasProvider from './../context/DivisasContext'

const HomeIndex = () => {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuth()

  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {width < 680 ? (
        <div className='flex h-screen flex-col'>
          <header className='flex items-center justify-between'>
            <div className='mx-4 flex items-center gap-5'>
              <img
                onClick={() => navigateTo('/')}
                className='full h-10 w-10 rounded-full cursor-pointer'
                src='https://play-lh.googleusercontent.com/V6TSj9QIoCp8-zK9S-PVU8uHfqrTk0dwzvqtmMGSA_s_c3v9LypsfRMQChUNhMyNiQ'
                alt=''
              />

              <h1
                onClick={() => navigateTo('/')}
                className='relative my-6 cursor-pointer text-center font-dosis text-2xl font-bold'
              >
                AllExpenses
              </h1>
            </div>

            {user && (
              <Link to='/'>
                {user?.photoURL ? (
                  <img
                    className='mx-4 h-9 w-9 rounded-full object-cover'
                    src={user?.photoURL}
                    alt=''
                  />
                ) : (
                  <div className='mx-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600'>
                    <p className='text-2xl text-white'>
                      {user?.displayName?.at(0) ?? 'U'}
                    </p>
                  </div>
                )}
              </Link>
            )}
          </header>

          <Routes>
            <Route
              path='*'
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

            <Route path='/login' element={<Login />} />

            <Route path='/forgot-password' element={<ForgotPassword />} />

            <Route path='/register' element={<Register />} />

            <Route path='/phone-number' element={<PhoneNumberLogin />} />
          </Routes>

          <footer
            className={
              pathname.includes('login') || pathname.includes('register')
                ? 'flex items-center justify-center'
                : 'flex flex-col items-center justify-center bg-gray-100 gap-4 text-sm'
            }
          >
            <p className='text-center mt-2 text-gray-500'>
              AllExpenses &copy; {new Date().getFullYear()}
            </p>

            <p className='text-center mb-5 text-gray-500'>
              Desarrollado por
              <a
                className='ml-1 underline text-blue-500'
                href='https://www.linkedin.com/in/alessandro-rios/'
                target='_blank'
                rel='noreferrer'
              >
                Alessandro Rios
              </a>
            </p>
          </footer>
        </div>
      ) : (
        <div className='flex h-screen flex-col items-center justify-center'>
          <div className='mx-4 flex items-center gap-5'>
            <img
              className='full h-10 w-10 rounded-full'
              src='https://play-lh.googleusercontent.com/V6TSj9QIoCp8-zK9S-PVU8uHfqrTk0dwzvqtmMGSA_s_c3v9LypsfRMQChUNhMyNiQ'
              alt=''
            />

            <h1 className='relative my-6 cursor-pointer text-center font-dosis text-2xl font-bold'>
              AllExpenses App
            </h1>
          </div>

          <p className='w-1/2 text-center font-medium'>
            Por el momento la aplicación sólo está disponible para dispositivos
            móviles, pero pronto estará disponible para todos los dispositivos.
          </p>

          <footer>
            <p className='mt-5 mb-2 text-center text-gray-500'>
              Desarrollado por
              <a
                className='ml-1 hover:underline'
                href='https://www.linkedin.com/in/alessandro-rios/'
                target='_blank'
                rel='noreferrer'
              >
                Alessandro Rios
              </a>
            </p>
          </footer>
        </div>
      )}
    </>
  )
}

export default HomeIndex
