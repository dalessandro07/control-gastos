import React, { useEffect, createContext, useState } from 'react'
import useGasto from '../hooks/useGasto'
import useImportExport from '../hooks/useImportExport'

import { useAuth } from './AuthContext'
import { obtenerGastosDB } from '../firebase'

import CryptoJS from 'crypto-js'
import moment from 'moment'
import 'moment/dist/locale/es'
import useObtenerServicios from '../hooks/useObtenerServicios'
import useFiltrarGastosPorMes from '../hooks/useFiltrarGastosPorMes'
import { useDivisas } from './DivisasContext'

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

  const { setDivisaActual } = useDivisas()

  const {
    gastos,
    saldoTotal,
    agregarGasto,
    obtenerGastos,
    loading,
    changeLoading
  } = useGasto()
  const { servicios, obtenerServicios } = useObtenerServicios()

  const { exportarGastos, importarGastos } = useImportExport(
    gastos,
    obtenerGastos,
    userUID
  )

  const { gastosPorMes, handleChangeMonth } = useFiltrarGastosPorMes(gastos)

  const [totalPorMes, setTotalPorMes] = useState({
    mes: null,
    monto: null
  })

  useEffect(() => {
    if (gastos) {
      handleChangeMonth(moment().format('YYYY-MM'))
    }
  }, [gastos])

  useEffect(() => {
    changeTotalPorMes({
      mes: gastosPorMes?.fecha?.toUpperCase() || 'De todos los meses',
      monto: gastosPorMes?.total ?? saldoTotal
    })
  }, [gastosPorMes, saldoTotal])

  useEffect(() => {
    changeLoading(true)

    obtenerGastosDB(querySnapshot => {
      const gastosDB = []
      const serviciosDB = []

      querySnapshot.forEach(doc => {
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
        } else if (doc.data().divisa) {
          setDivisaActual({ id: doc.id, divisa: doc.data().divisa })
        }
      })

      obtenerGastos(gastosDB)
      obtenerServicios(serviciosDB)
      changeLoading(false)
    }, userUID)
  }, [])

  const changeTotalPorMes = gastosFiltrados => setTotalPorMes(gastosFiltrados)

  const value = {
    saldoTotal,
    agregarGasto,
    gastos,
    servicios,
    loading,
    moment,
    exportarGastos,
    importarGastos,
    totalPorMes,
    changeTotalPorMes,
    gastosPorMes
  }

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>
}

export default SaldoProvider
