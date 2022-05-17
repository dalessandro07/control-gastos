import React, { createContext } from 'react'
import useSaldo from '../hooks/useSaldo'
import useAssignImg from './../hooks/useAssignImg'

export const SaldoContext = createContext({
  saldoTotal: 0,
  gastos: [],
  agregarGasto: () => {},
  nroImagen: 0,
  aumentarNroImagen: () => {},
  loading: false
})

const SaldoProvider = ({ children }) => {
  const { gastos, saldoTotal, agregarGasto, loading } = useSaldo()

  const { aumentarNroImagen } = useAssignImg()

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    aumentarNroImagen,
    loading
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
