import { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { SaldoContext } from '../context/SaldoContext'

const useEditGasto = (mode) => {
  const { id } = useParams()
  const { gastos } = useContext(SaldoContext)

  const title = mode === 'edit' ? 'Editar' : 'Nuevo'

  const button = mode === 'edit' ? 'Editar' : 'Agregar'

  const gasto = gastos.find((gasto) => gasto.id === Number(id)) || {}

  return { title, button, gasto }
}

export default useEditGasto
