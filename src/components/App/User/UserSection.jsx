import React from 'react'

import { useAuth } from '../../../context/AuthContext'
import useLogout from './hooks/useLogout'
import UserAvatar from './utils/UserAvatar'

import UserOptions from './UserOptions'
import { IconButton, Tooltip } from '@material-tailwind/react'

const UserSection = () => {
  const { user } = useAuth()
  const { handleLogout } = useLogout()

  const tooltipAnimation = {
    mount: { scale: 1, y: 0 },
    unmount: { scale: 0, y: 25 }
  }

  return (
    <>
      <header className="mt-10 mb-5 flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold">Perfil</h1>

        <UserAvatar user={user} isUserSection />
      </header>

      <section className="mb-10 flex grow flex-col items-center">
        <UserOptions />

        <article className="mb-5 flex w-full items-center justify-around">
          <Tooltip content="Cerrar sesión" placement="bottom">
            <IconButton
              animate={tooltipAnimation}
              color="red"
              onClick={handleLogout}
              variant="gradient">
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
            </IconButton>
          </Tooltip>
        </article>
      </section>
    </>
  )
}

export default UserSection
