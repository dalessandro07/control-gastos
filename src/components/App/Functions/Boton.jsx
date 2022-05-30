import React from 'react'
import { evaluate } from 'mathjs'
import { toast } from 'react-toastify'

const Boton = ({ operacion, value, setOperacion, setResultado }) => {
  const handleClick = () => {
    if (operacion.length < 9) {
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
          toast.error('Error en la operación - ' + error.message)
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
