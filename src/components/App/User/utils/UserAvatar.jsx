import React from 'react'

import { useAuth } from '../../../../context/AuthContext'
import { useColor } from '../../../../context/ColorContext'

import useCreationTime from '../hooks/useCreationTime'

const UserAvatar = ({ isUserSection = false }) => {
  const { user } = useAuth()
  const { photoURL, displayName } = user
  const { colorActual, resumeColor } = useColor()
  const { createdAt } = useCreationTime()

  const completeName = displayName ?? user?.email?.split('@')[0] ?? 'Usuario'
  const nameLogo = displayName?.at(0) ?? 'U'
  const border = resumeColor === 'amber' ? 'border-amber-400' : 'border-indigo-200'

  return (
    <>
      {photoURL ? (
        isUserSection ? (
          <section className="relative my-4">
            <div
              className={`absolute -top-4 -bottom-4 right-0 left-0 flex rounded-full border ${border}`}
            />
            <div className={`absolute -inset-4 flex rotate-12 rounded-full border-x ${border}`} />
            <img className="mx-4 h-16 w-16 rounded-full object-cover" src={photoURL} alt="" />
          </section>
        ) : (
          <img className="mx-4 h-10 w-10 rounded-full object-cover" src={photoURL} alt="" />
        )
      ) : (
        <div
          className={`mx-4 flex ${
            isUserSection ? 'h-14 w-14' : 'h-10 w-10'
          } items-center justify-center rounded-full ${colorActual}`}>
          <p className={`${isUserSection ? 'text-4xl' : 'text-2xl'} text-white`}>{nameLogo}</p>
        </div>
      )}

      {isUserSection && (
        <div className="flex flex-col">
          <h3 className="text-center font-bold">{completeName}</h3>
          {createdAt && <p className="text-xs text-gray-600">Desde {createdAt}</p>}
        </div>
      )}
    </>
  )
}

export default UserAvatar
