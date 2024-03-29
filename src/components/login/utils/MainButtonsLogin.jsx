import React from 'react'
import { Link } from 'react-router-dom'

import useLogin from '../hooks/useLogin'
import GoogleButton from './GoogleButton'
import PhoneButton from './PhoneButton'
import AmberButton from './../../utils/Button/AmberButton'

const MainButtonsLogin = ({ showEmailLogin, setShowEmailLogin }) => {
  const { handleGoogleLogin } = useLogin()

  return (
    <div className="mt-6 flex w-2/3 flex-col">
      <GoogleButton handleGoogleLogin={handleGoogleLogin} />

      <PhoneButton />

      <div className="flex items-center gap-2">
        <div className="h-1 w-full border-t border-black" />
        <p className="mb-1 text-sm">o</p>
        <div className="h-1 w-full border-t border-black" />
      </div>

      <Link className="mx-auto w-max" to="/register">
        <AmberButton handleClick={() => setShowEmailLogin(!showEmailLogin)}>
          Crear cuenta
        </AmberButton>
      </Link>

      <footer className="mt-5 flex flex-col items-start gap-2 xs:flex-row">
        <p className="text-sm">¿Ya tienes una cuenta?</p>
        <button
          onClick={() => setShowEmailLogin(!showEmailLogin)}
          className="text-sm text-blue-500">
          Inicia sesión
        </button>
      </footer>
    </div>
  )
}

export default MainButtonsLogin
