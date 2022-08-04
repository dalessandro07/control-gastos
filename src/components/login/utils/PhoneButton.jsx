import React from 'react'
import { useNavigate } from 'react-router-dom'

const PhoneButton = () => {
  const navigateTo = useNavigate()

  return (
    <button
      onClick={() => {
        navigateTo('/phone-number')
      }}
      className="group m-auto my-6 flex w-full items-center rounded-full border border-amber-400 p-2 px-6 transition-all duration-100 ease-linear hover:border-blue-400 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-4 h-5 w-5 text-blue-600 group-hover:text-blue-50"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      <p className="text-sm font-semibold group-hover:text-blue-50 xsm:text-base">
        Ingresar con teléfono
      </p>
    </button>
  )
}

export default PhoneButton
