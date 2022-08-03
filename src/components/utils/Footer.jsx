import React from 'react'
import { useLocation } from 'react-router-dom'

import Copyright from './Copyright'

const Footer = () => {
  const { pathname } = useLocation()

  return (
    <footer
      className={
        pathname.includes('login') || pathname.includes('register')
          ? 'flex flex-col items-center justify-center gap-4 text-sm'
          : 'flex flex-col items-center justify-center gap-4 bg-gray-100 text-sm'
      }>
      <p className="mt-2 text-center text-gray-500">
        AllExpenses &copy; {new Date().getFullYear()}
      </p>

      <Copyright />
    </footer>
  )
}

export default Footer
