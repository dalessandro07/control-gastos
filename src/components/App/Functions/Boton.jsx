import React from 'react'
import { evaluate } from 'mathjs'
import { toast } from 'react-toastify'
import useTranslate from '../../../hooks/useTranslate'

const Boton = ({ operacion, value, setOperacion, setResultado }) => {
  const { translateWord } = useTranslate()

  const handleClick = () => {
    if (operacion.length < 12) {
      if (value !== '=') {
        if (operacion !== '0') {
          setOperacion(operacion + value)
        } else {
          setOperacion(value)
        }
      } else {
        try {
          setResultado(evaluate(operacion))
        } catch (error) {
          toast.promise(translateWord(error.message, 'es'), {
            pending: 'Error detectado...',
            success: {
              render({ data }) {
                return `${data}`
              },
              type: 'error'
            },
            error: 'Verifique los datos ingresados e intente nuevamente.'
          })
        }
      }
    } else if (value === '=') {
      setResultado(evaluate(operacion))
    }
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-sm border-2 border-gray-300 bg-gray-200 p-2 font-semibold shadow-xl hover:bg-amber-300">
      {value}
    </button>
  )
}

export default Boton
