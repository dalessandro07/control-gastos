import React, { useEffect, createContext } from 'react'
import useGasto from '../hooks/useGasto'
import useImportExport from '../hooks/useImportExport'

import { useAuth } from './AuthContext'
import { obtenerGastosDB } from '../firebase'

import CryptoJS from 'crypto-js'
import moment from 'moment'
import 'moment/dist/locale/es'
import useObtenerServicios from '../hooks/useServicios'

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
  const { servicios, obtenerServicios } = useObtenerServicios()

  const { exportarGastos, importarGastos } = useImportExport(gastos, obtenerGastos, userUID)

  useEffect(() => {
    changeLoading(true)

    obtenerGastosDB((querySnapshot) => {
      const gastosDB = []
      const serviciosDB = []

      querySnapshot.forEach((doc) => {
        if (doc.data().ciphertext) {
          const bytes = CryptoJS.AES.decrypt(doc.data().ciphertext, userUID)
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

          if (decryptedData.nombre) {
            serviciosDB.push({
              ...decryptedData,
              idDB: doc.id
            })
          } else {
            gastosDB.push({
              ...decryptedData,
              idDB: doc.id
            })
          }
        } else {
          gastosDB.push({
            ...doc.data(),
            idDB: doc.id
          })
        }
      })

      obtenerGastos(gastosDB)
      obtenerServicios(serviciosDB)
      changeLoading(false)
    }, userUID)
  }, [])

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    servicios,
    loading,
    moment,
    exportarGastos,
    importarGastos
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
