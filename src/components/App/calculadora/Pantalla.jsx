import React from 'react'

const Pantalla = ({ operacion, resultado }) => {
  return (
    <section className="flex flex-col">
      <p className="w-full overflow-x-auto bg-gray-200 p-4 text-right text-3xl font-semibold">
        {operacion}
      </p>

      <p className="w-full bg-gray-200 p-4 text-right">
        {resultado.toString().includes('.') ? resultado.toFixed(2) : resultado}
      </p>
    </section>
  )
}

export default Pantalla
