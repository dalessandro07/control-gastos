import moment from 'moment'
import React from 'react'
import { useColor } from '../../../../context/ColorContext'

const UserAvatar = ({ user, isUserSection = false }) => {
  const { photoURL, displayName } = user
  const { colorActual } = useColor()

  const nameLogo = displayName?.at(0) ?? 'U'
  const completeName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Usuario'

  const createdAtTimestamp = new Date(Number(user?.reloadUserInfo?.createdAt))
  const createdAt = moment(createdAtTimestamp).fromNow()

  const border = colorActual.includes('amber') ? 'border-amber-400' : 'border-indigo-200'

  return (
    <>
      {photoURL ? (
        !isUserSection ? (
          <img className="mx-4 h-10 w-10 rounded-full object-cover" src={photoURL} alt="" />
        ) : (
          <section className="relative my-4">
            <div
              className={`absolute -top-4 -bottom-4 right-0 left-0 flex rounded-full border ${border}`}
            />
            <div className={`absolute -inset-4 flex rotate-12 rounded-full border-x ${border}`} />
            <img className="mx-4 h-16 w-16 rounded-full object-cover" src={photoURL} alt="" />
          </section>
        )
      ) : (
        <div
          className={`mx-4 flex h-10 w-10 items-center justify-center rounded-full ${colorActual}`}>
          <p className="text-2xl text-white">{nameLogo}</p>
        </div>
      )}

      {isUserSection && (
        <div className="flex flex-col">
          <h3 className="text-sm font-bold">{completeName}</h3>
          {createdAt && <p className="text-xs text-gray-600">Desde {createdAt}</p>}

          {user?.phoneNumber && (
            <p className="font-semibold text-gray-600">
              {user?.phoneNumber?.length > 0 &&
                user?.phoneNumber?.replace('+', '').replace(/\d(?=\d{4})/g, '*')}
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default UserAvatar
