import React, { useState, useEffect } from 'react'
import Gasto from '../Info/Gasto'
import moment from 'moment'
import { useDivisas } from '../../../context/DivisasContext'

const ListaPorEtiqueta = ({
  gastos,
  selectedTag,
  changeSelectTag,
  porcentajes
}) => {
  const { divisaActual } = useDivisas()

  const [gastosPorEtiqueta, setGastosPorEtiqueta] = useState([])

  const [montoTotal, setMontoTotal] = useState(0)

  useEffect(() => {
    const gastosPorEtiqueta = gastos.filter(
      gasto => gasto.etiqueta === selectedTag?.tag?.toLowerCase()
    )

    const montoTotal = gastosPorEtiqueta
      .reduce((acc, gasto) => acc + gasto.monto, 0)
      .toFixed(2)

    setGastosPorEtiqueta(gastosPorEtiqueta)
    setMontoTotal(montoTotal)
  }, [gastos, selectedTag])

  return (
    <>
      <section
        onClick={() => changeSelectTag({})}
        className='absolute top-0 left-0 mx-4'
      >
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </section>

      <section className='flex flex-col items-center justify-center'>
        <article className='flex font-bold text-red-500'>
          <p>{divisaActual?.divisa}</p>
          <p className='text-3xl'>{montoTotal}</p>
        </article>

        <article>
          {porcentajes.length > 0 && (
            <p className='ml-2 text-sm text-red-500'>
              (
              {porcentajes
                .find(
                  porcentaje =>
                    porcentaje.etiqueta === selectedTag?.tag?.toLowerCase()
                )
                ?.porcentaje.toFixed(1)}
              % del total)
            </p>
          )}
        </article>

        <p className='my-2 text-sm text-gray-600'>
          Total de gastos:{' '}
          <span className='font-bold'>{gastosPorEtiqueta.length}</span>
        </p>
      </section>

      {gastosPorEtiqueta?.map(gasto => (
        <Gasto key={gasto.id} gasto={gasto} moment={moment} />
      ))}
    </>
  )
}

export default ListaPorEtiqueta
