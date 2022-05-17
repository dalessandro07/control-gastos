import { useState } from 'react'
import useAssignImg from './useAssignImg'
import useTranslate from './useTranslate'

const useSaldo = () => {
  const [gastos, setGastos] = useState([])
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { assignImg } = useAssignImg()
  const { translateWord } = useTranslate()

  const id = gastos.length > 0 ? gastos.length + 1 : 1

  const agregarGasto = async (gasto) => {
    const { monto, descripcion, fecha } = gasto

    setLoading(true)

    const translatedDescrip = !descripcion.includes('mercado')
      ? await translateWord(descripcion)
      : 'mercado'

    setGastos([
      ...gastos,
      {
        id,
        monto,
        descripcion,
        fecha,
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

export default useSaldo
