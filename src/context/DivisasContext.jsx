import React, { useState, createContext, useContext } from 'react'
import { agregarDivisaDB, actualizarDivisaDB } from '../firebase'

export const divisasContext = createContext()

export const useDivisas = () => {
  const context = useContext(divisasContext)
  if (!context) {
    throw new Error('Error, no hay un proveedor de divisas.')
  }
  return context
}

const DivisasProvider = ({ children }) => {
  const [divisaActual, setDivisaActual] = useState({})

  const changeDivisa = (div, UID) => {
    const { divisa } = div

    setDivisaActual(divisa)

    if (div.id) {
      actualizarDivisaDB(div.id, divisa, UID)
    } else {
      agregarDivisaDB(divisa, UID)
    }
  }

  return (
    <divisasContext.Provider value={{ divisaActual, changeDivisa, setDivisaActual }}>
      {children}
    </divisasContext.Provider>
  )
}

export default DivisasProvider
