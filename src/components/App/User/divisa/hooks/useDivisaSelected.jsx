import { useState, useEffect } from 'react'

import useChangeDivisa from './useChangeDivisa'

const useDivisaSelected = () => {
  const { saveDivisaDB, divisaActual } = useChangeDivisa()
  const [divisaSelected, setDivisaSelected] = useState(divisaActual.divisa || '')

  const handleChangeDivisa = val => setDivisaSelected(val)
  const saveDivisa = () => saveDivisaDB(divisaSelected)

  useEffect(() => setDivisaSelected(divisaActual?.divisa), [divisaActual])

  return { divisaSelected, handleChangeDivisa, saveDivisa }
}

export default useDivisaSelected
