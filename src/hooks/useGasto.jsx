import { useState } from 'react'
import useAssignImg from './useAssignImg'
import useTranslate from './useTranslate'

const useGasto = () => {
  const [gastos, setGastos] = useState([])
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [loading, setLoading] = useState()
  const { assignImg } = useAssignImg()
  const { translateWord } = useTranslate()

  const id = gastos.length > 0 ? gastos.length + 1 : 1

  const agregarGasto = async (gasto) => {
    const { monto, descripcion, fecha, etiqueta } = gasto

    setLoading(true)

    const translatedDescrip = !descripcion.includes('mercado')
      ? await translateWord(descripcion, 'en')
      : 'mercado'

    setGastos([
      ...gastos,
      {
        id,
        monto,
        descripcion,
        fecha,
        etiqueta,
        img: await assignImg(translatedDescrip)
      }
    ])
    setSaldoTotal(saldoTotal + monto)

    setLoading(false)
  }

  return {
    gastos,
    saldoTotal,
    agregarGasto,
    loading
  }
}

export default useGasto
