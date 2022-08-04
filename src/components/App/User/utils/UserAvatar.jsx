import React from 'react'
import { useColor } from '../../../../context/ColorContext'

const UserAvatar = ({ user }) => {
  const { photoURL, displayName } = user
  const { colorActual } = useColor()

  return (
    <>
      {photoURL ? (
        <img className="mx-4 h-10 w-10 rounded-full object-cover" src={photoURL} alt="" />
      ) : (
        <div
          className={`mx-4 flex h-10 w-10 items-center justify-center rounded-full ${colorActual}`}>
          <p className="text-2xl text-white">{displayName?.at(0) ?? 'U'}</p>
        </div>
      )}
    </>
  )
}

export default UserAvatar
