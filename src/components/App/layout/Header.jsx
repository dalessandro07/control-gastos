import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const Header = () => {
  const { user } = useAuth()
  const navigateTo = useNavigate()

  return (
    <header className="flex items-center justify-between">
      <div className="mx-4 flex items-center gap-5">
        <img
          onClick={() => navigateTo('/')}
          className="full h-10 w-10 cursor-pointer rounded-full"
          src="/pwa-192x192.png"
          alt=""
        />

        <h1
          onClick={() => navigateTo('/')}
          className="relative my-6 cursor-pointer text-center font-dosis text-xl font-bold">
          AllExpenses
        </h1>
      </div>

      {user && (
        <Link to="/">
          {user?.photoURL ? (
            <img className="mx-4 h-9 w-9 rounded-full object-cover" src={user?.photoURL} alt="" />
          ) : (
            <div className="mx-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
              <p className="text-2xl text-white">{user?.displayName?.at(0) ?? 'U'}</p>
            </div>
          )}
        </Link>
      )}
    </header>
  )
}

export default Header
