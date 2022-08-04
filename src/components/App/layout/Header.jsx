import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useColor } from '../../../context/ColorContext'
import UserAvatar from './../User/utils/UserAvatar'

const Header = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const { colorActual } = useColor()
  const navigateTo = useNavigate()

  return (
    <header className="flex items-center justify-between">
      <div className="mx-4 flex items-center gap-5">
        {user?.displayName && pathname !== '/login' && pathname !== '/register' ? (
          <div className="my-6 flex flex-col font-bold">
            <p className="px-2 pt-2 text-sm">¡Bienvenido de nuevo,</p>
            <Link to="/">
              <h1 className={`bg-clip-text px-2 text-lg text-transparent ${colorActual}`}>
                {user?.displayName}!
              </h1>
            </Link>
          </div>
        ) : (
          <>
            <img
              onClick={() => navigateTo('/')}
              className="h-10 w-10 cursor-pointer rounded-full"
              src="/pwa-192x192.png"
              alt=""
            />

            <h1
              onClick={() => navigateTo('/')}
              className="relative my-6 cursor-pointer text-center font-dosis text-xl font-bold">
              AllExpenses
            </h1>
          </>
        )}
      </div>

      {user && (
        <Link className="pr-1" to="/">
          <UserAvatar user={user} />
        </Link>
      )}
    </header>
  )
}

export default Header
