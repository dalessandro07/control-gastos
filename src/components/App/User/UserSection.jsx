import React from 'react'

import UserAvatar from './utils/UserAvatar'
import UserOptions from './UserOptions'
import Logout from './Logout'

const UserSection = () => {
  return (
    <>
      <header className="mt-10 mb-5 flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold">Perfil</h1>

        <UserAvatar isUserSection />
      </header>

      <section className="mb-10 flex grow flex-col items-center">
        <UserOptions />

        <article className="mb-5 flex w-full items-center justify-around">
          <Logout />
        </article>
      </section>
    </>
  )
}

export default UserSection
