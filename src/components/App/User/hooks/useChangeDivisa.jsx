import { useAuth } from '../../../../context/AuthContext'
import { useDivisasContext } from '../../../../context/DivisasContext'

import { toast } from 'react-toastify'

const useChangeDivisa = () => {
  const { userUID } = useAuth()
  const { divisaActual, changeDivisa } = useDivisasContext()

  const handleChangeDivisa = ({ target: { value } }) => {
    if (!divisaActual?.divisa) {
      changeDivisa({ divisa: value }, userUID)
    } else {
      changeDivisa({ ...divisaActual, divisa: value }, userUID)
    }
    toast.success('¡Divisa cambiada correctamente!')
  }

  const divisas = {
    '': 'Ninguna divisa',
    'S/': 'Soles',
    $: 'Dólares, Pesos',
    '€': 'Euros'
  }

  return {
    divisas,
    handleChangeDivisa,
    divisaActual
  }
}

export default useChangeDivisa
