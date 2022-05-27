import React, { useEffect, createContext } from 'react'
import useGasto from '../hooks/useGasto'
import useImportExport from '../hooks/useImportExport'

import { useAuth } from './AuthContext'
import { obtenerGastosDB } from '../firebase'

import CryptoJS from 'crypto-js'
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
  const { userUID } = useAuth()
  const { gastos, saldoTotal, agregarGasto, obtenerGastos, loading, changeLoading } = useGasto()

  const { exportarGastos, importarGastos } = useImportExport(gastos, obtenerGastos, userUID)

  useEffect(() => {
    changeLoading(true)

    obtenerGastosDB((querySnapshot) => {
      const gastosDB = []

      querySnapshot.forEach((doc) => {
        if (doc.data().ciphertext) {
          const bytes = CryptoJS.AES.decrypt(doc.data().ciphertext, userUID)
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

          gastosDB.push({
            ...decryptedData,
            idDB: doc.id
          })
        } else {
          gastosDB.push({
            ...doc.data(),
            idDB: doc.id
          })
        }
      })

      console.log(gastosDB)

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
