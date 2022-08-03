import React from 'react'
import { useDivisas } from '../../../context/DivisasContext'
import ExpiredServices from '../servicios/ExpiredServices'
import useShowSaldo from './hooks/useShowSaldo'

const Saldo = () => {
  const { divisaActual } = useDivisas()
  const { saldoAMostrar, loading, servicios, totalPorMes, saldoTotal } = useShowSaldo()

  return (
    <>
      <header className="mt-8 flex flex-col items-center">
        <h2 className="font-semibold text-gray-600">Total gastado:</h2>
        <p className="text-sm text-gray-600">{totalPorMes?.mes || 'De todos los meses'}</p>
        <section className="flex w-full justify-center bg-amber-300 py-3">
          <article className="mx-2 flex">
            <p className="text-gray-800">{divisaActual?.divisa}</p>
            <section className="">
              {loading ? (
                <section className="animate-bounce text-2xl font-bold">...</section>
              ) : (
                <p className="text-5xl font-bold">{saldoAMostrar || saldoTotal?.toFixed(2)}</p>
              )}
            </section>
          </article>
        </section>
      </header>

      <ExpiredServices servicios={servicios} />
    </>
  )
}

export default Saldo
