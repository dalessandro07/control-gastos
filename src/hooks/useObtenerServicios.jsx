import { useState } from 'react'

const useObtenerServicios = () => {
  const [servicios, setServicios] = useState([])

  const obtenerServicios = servicios => setServicios(servicios)

  return { servicios, obtenerServicios }
}

export default useObtenerServicios
