import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Boton from './Boton'
import Pantalla from './Pantalla'

const Calculadora = () => {
  const [operacion, setOperacion] = useState('0')
  const [resultado, setResultado] = useState(0)

  const navigateTo = useNavigate()

  const valoresBotones = [
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '.',
    '0',
    '/',
    '='
  ]

  const handleSubmitMonto = () => {
    if (resultado !== 0) {
      navigateTo(`/nuevo-gasto/formulario?monto=${resultado}`)
    }
  }

  return (
    <section className="mx-8">
      <header className="my-4">
        <h3 className="text-center text-lg font-semibold">Calculadora</h3>
      </header>

      <section className="m-8">
        <header>
          <Pantalla operacion={operacion} resultado={resultado} />
        </header>

        <article className="grid grid-cols-4 grid-rows-4">
          {valoresBotones.map((value, index) => (
            <Boton
              key={index}
              operacion={operacion}
              value={value}
              setOperacion={setOperacion}
              setResultado={setResultado}
            />
          ))}

          <button
            onClick={() => {
              setOperacion('0')
            }}
            className="col-span-2 border-2 border-gray-300 bg-gray-200 p-2 font-semibold hover:bg-red-300">
            AC
          </button>

          <button
            onClick={() => {
              if (operacion.length > 1) {
                setOperacion(operacion.slice(0, -1))
              } else {
                setOperacion('0')
              }
            }}
            className="col-span-2 flex justify-center border-2 border-gray-300 bg-gray-200 p-2 hover:bg-red-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </article>

        <footer className="m-5 flex justify-center">
          <button onClick={handleSubmitMonto} className="rounded-sm bg-amber-300 p-2 shadow-lg">
            Agregar monto
          </button>
        </footer>
      </section>
    </section>
  )
}

export default Calculadora
