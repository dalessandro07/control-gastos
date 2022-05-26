import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'

const UserSection = () => {
  const { user, logout } = useAuth()
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.info('¡Sesión cerrada, hasta luego!')
    navigateTo('/login')
  }

  return (
    <section>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">{`Bienvenid${
          user?.displayName?.at(-1) === 'a' ? 'a' : 'o'
        }`}</h1>

        <img
          className="mt-4 h-12 w-12 rounded-full object-cover"
          src={
            user.photoURL ??
            'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
          }
          alt=""
        />

        <p className="mt-2 text-xl font-bold text-sky-600">
          {user.displayName ?? user.email.split('@')[0]}
        </p>
      </header>

      <section className="mt-8 flex flex-col items-center justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center rounded-full bg-red-600 p-2 text-sm font-bold text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
        <p className="mb-4 font-bold">Cerrar sesión</p>
      </section>
    </section>
  )
}

export default UserSection
