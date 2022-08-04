import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useGastosAMostrar = () => {
  const [gastosAMostrar, setGastosAMostrar] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/gastos') setGastosAMostrar(null)
  }, [pathname])

  return { gastosAMostrar, setGastosAMostrar }
}

export default useGastosAMostrar
