import React from 'react'
import { useLocation } from 'react-router-dom'

import useResizeWindow from '../../../hooks/useResizeWindow'
import Copyright from '../../utils/Copyright'

const Footer = () => {
  const { pathname } = useLocation()
  const { width } = useResizeWindow()

  return (
    <footer
      className={
        pathname.includes('login') || pathname.includes('register') || width > 680
          ? 'mt-5 flex flex-col items-center justify-end gap-4 text-sm'
          : 'flex flex-col items-center justify-end gap-4 bg-gray-100 text-sm'
      }>
      <p className="mt-2 text-center text-gray-500">
        AllExpenses &copy; {new Date().getFullYear()}
      </p>

      <Copyright />
    </footer>
  )
}

export default Footer
