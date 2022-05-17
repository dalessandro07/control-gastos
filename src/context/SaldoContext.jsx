import React, { createContext } from 'react'
import useSaldo from '../hooks/useSaldo'

export const SaldoContext = createContext({
  saldoTotal: 0,
  gastos: [],
  agregarGasto: () => {}
})

const SaldoProvider = ({ children }) => {
  const { gastos, saldoTotal, agregarGasto, loading } = useSaldo()

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    loading
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
