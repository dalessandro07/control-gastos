import React, { useEffect, createContext } from 'react'
import useGasto from '../hooks/useGasto'

import { obtenerGastosDB } from '../firebase'

import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')

export const SaldoContext = createContext({
  saldoTotal: 0,
  gastos: [],
  agregarGasto: () => {},
  nroImagen: 0,
  aumentarNroImagen: () => {},
  loading: false
})

const SaldoProvider = ({ children }) => {
  const { gastos, saldoTotal, agregarGasto, obtenerGastos, loading, changeLoading } = useGasto()

  useEffect(() => {
    const querySnapshot = async () => {
      changeLoading(true)
      const gastosDB = await obtenerGastosDB()

      const data = gastosDB.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      obtenerGastos(data)
      changeLoading(false)
    }

    querySnapshot()
  }, [])

  gastos?.sort((a, b) => (moment(a.fecha).isBefore(b.fecha) ? 1 : -1))

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    loading,
    moment
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
