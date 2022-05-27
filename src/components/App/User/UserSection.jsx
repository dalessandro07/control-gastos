import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import Modal from '../../../utilities/Modal'

const UserSection = () => {
  const { user, logout, deleteAccount } = useAuth()
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.info('¡Sesión cerrada, hasta luego!')
    navigateTo('/login')
  }

  const handleDeleteAccount = async () => {
    await deleteAccount()
    toast.info('¡Cuenta eliminada!')
    navigateTo('/login')
  }

  return (
    <section>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">
          ¡{`Bienvenid${user?.displayName?.at(-1) === 'a' ? 'a' : 'o'}`}!
        </h1>

        <img
          className="mt-4 h-12 w-12 rounded-full object-cover"
          src={
            user.photoURL ??
            'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
          }
          alt=""
        />

        <p className="mt-2 flex text-xl font-bold text-sky-600">
          {user.displayName ?? user.email.split('@')[0]}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#22c55e">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </header>

      <section className="mt-8 flex flex-col items-center justify-center">
        <article className="flex flex-col items-center">
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
          <p onClick={handleLogout} className="mb-4 cursor-pointer font-bold">
            Cerrar sesión
          </p>
        </article>

        <button
          onClick={() => {
            setShowDeleteAccount(!showDeleteAccount)
          }}
          className="mt-6 text-sm text-gray-600 underline">
          {showDeleteAccount ? 'Ocultar' : 'Deseo eliminar mi cuenta'}
        </button>

        {showDeleteAccount && (
          <article className="mt-8">
            <Modal
              titleModal="Eliminar mi cuenta ⚠️"
              paragraphModal="¿Está seguro?, esta acción no se puede deshacer, le recomendamos que exporte sus gastos antes de eliminar la cuenta."
              textButtonModal="Eliminar mi cuenta"
              callbackButtonConfirm={handleDeleteAccount}
            />
          </article>
        )}
      </section>
    </section>
  )
}

export default UserSection
