import { useState, useEffect, useContext } from 'react'
import { SaldoContext } from '../../../../context/SaldoContext'

const useShowSaldo = () => {
  const { gastos, saldoTotal, servicios, loading, totalPorMes } = useContext(SaldoContext)
  const [saldoAMostrar, setSaldoAMostrar] = useState(saldoTotal)

  useEffect(() => {
    const mes = totalPorMes?.mes

    if (mes) {
      if (totalPorMes?.monto === 0 || !totalPorMes?.monto) {
        setSaldoAMostrar(saldoTotal.toFixed(2))
      } else {
        setSaldoAMostrar(totalPorMes?.monto?.toFixed(2))
      }
    } else {
      setSaldoAMostrar(saldoTotal.toFixed(2))
    }
  }, [gastos, saldoTotal, totalPorMes])

  return {
    saldoAMostrar,
    loading,
    servicios,
    totalPorMes,
    saldoTotal
  }
}

export default useShowSaldo
