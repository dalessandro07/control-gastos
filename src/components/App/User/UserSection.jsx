import React, { useState } from 'react'

import { useAuth } from '../../../context/AuthContext'

import Modal from '../../utils/Modal'

import UserAvatar from './utils/UserAvatar'

import useLogout from './hooks/useLogout'
import useDeleteAccount from './hooks/useDeleteAccount'

import UserOptions from './UserOptions'

const UserSection = () => {
  const { user } = useAuth()

  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  const { handleLogout } = useLogout()
  const { handleDeleteAccount } = useDeleteAccount()

  return (
    <>
      <header className="my-10 flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold">Perfil</h1>

        <UserAvatar user={user} isUserSection />
      </header>

      <section className="mb-10 flex grow flex-col items-center">
        <UserOptions />

        <article className="mb-5 flex w-full items-center justify-around">
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center rounded-full bg-red-600 p-2 text-sm font-bold text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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

            <p onClick={handleLogout} className="cursor-pointer text-sm">
              Cerrar sesión
            </p>
          </div>
        </article>

        <button
          onClick={() => {
            setShowDeleteAccount(!showDeleteAccount)
          }}
          className="mt-6 bg-red-100 p-2 text-sm text-red-600 underline">
          {showDeleteAccount ? 'Ocultar' : '⚠️ Deseo eliminar mi cuenta'}
        </button>

        {showDeleteAccount && (
          <article className="my-8">
            <Modal
              titleModal="Eliminar mi cuenta ⚠️"
              paragraphModal="¿Está seguro?, esta acción no se puede deshacer, le recomendamos que exporte sus gastos antes de eliminar la cuenta."
              textButtonModal="Eliminar mi cuenta"
              callbackButtonConfirm={handleDeleteAccount}
            />
          </article>
        )}
      </section>
    </>
  )
}

export default UserSection
