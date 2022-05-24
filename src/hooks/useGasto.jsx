import { useState } from 'react'
import useAssignImg from './useAssignImg'
import useTranslate from './useTranslate'

import { agregarGastoDB } from '../firebase'

import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')

const useGasto = () => {
  const [gastos, setGastos] = useState([])
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { assignImg } = useAssignImg()
  const { translateWord } = useTranslate()

  const id = gastos.length > 0 ? gastos.length + 1 : 1

  const agregarGasto = async (gasto) => {
    const { monto, descripcion, fecha, etiqueta } = gasto

    setLoading(true)

    const translatedDescrip = !descripcion.toLowerCase().includes('mercado')
      ? await translateWord(descripcion, 'en')
      : 'mercado'

    const gastoFinalAgregado = {
      id,
      monto,
      descripcion,
      fecha,
      etiqueta,
      img: await assignImg(translatedDescrip)
    }

    setGastos([...gastos, gastoFinalAgregado])
    setSaldoTotal(saldoTotal + monto)

    setLoading(false)

    agregarGastoDB(gastoFinalAgregado)
  }

  const obtenerGastos = (data) => {
    setGastos(data)
    setSaldoTotal(data.reduce((total, gasto) => total + gasto.monto, 0))
  }

  const changeLoading = (value) => setLoading(value)

  gastos?.sort((a, b) => (moment(a.fecha).isBefore(b.fecha) ? 1 : -1))

  return {
    gastos,
    saldoTotal,
    agregarGasto,
    obtenerGastos,
    changeLoading,
    loading
  }
}

export default useGasto
