import { useState, useEffect, useContext } from 'react'
import { SaldoContext } from '../../../../context/SaldoContext'

import moment from 'moment'

const useShowSaldo = () => {
  const { gastos, saldoTotal, servicios, loading, totalPorMes } = useContext(SaldoContext)
  const [saldoAMostrar, setSaldoAMostrar] = useState(saldoTotal?.toFixed(2))
  const mesActual = moment().format('MMMM')

  useEffect(() => {
    if (totalPorMes) {
      const { monto } = totalPorMes

      if (monto > 0) setSaldoAMostrar(monto?.toFixed(2))
    }
  }, [gastos, saldoTotal, totalPorMes])

  return {
    saldoAMostrar,
    servicios,
    loading,
    totalPorMes,
    saldoTotal,
    mesActual
  }
}

export default useShowSaldo
