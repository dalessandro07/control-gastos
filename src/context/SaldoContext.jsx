import React, { useEffect, createContext } from 'react'
import useGasto from '../hooks/useGasto'
import useImportExport from '../hooks/useImportExport'

import { obtenerGastosDB } from '../firebase'

import moment from 'moment'
import 'moment/dist/locale/es'
import { useAuth } from './AuthContext'
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
  const { userUID } = useAuth()
  const { gastos, saldoTotal, agregarGasto, obtenerGastos, loading, changeLoading } = useGasto()

  const { exportarGastos, importarGastos } = useImportExport(gastos, obtenerGastos)

  useEffect(() => {
    changeLoading(true)
    obtenerGastosDB((querySnapshot) => {
      const gastosDB = []

      querySnapshot.forEach((doc) => {
        gastosDB.push({
          idDB: doc.id,
          ...doc.data()
        })
      })

      obtenerGastos(gastosDB)
      changeLoading(false)
    }, userUID)
  }, [])

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    loading,
    moment,
    exportarGastos,
    importarGastos
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
