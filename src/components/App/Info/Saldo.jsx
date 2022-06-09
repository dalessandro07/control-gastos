import React, { useContext } from 'react'
import { SaldoContext } from '../../../context/SaldoContext'
import ExpiredServices from '../Functions/ExpiredServices'

const Saldo = () => {
  const { saldoTotal, servicios, loading } = useContext(SaldoContext)

  return (
    <>
      <header className="mt-8 flex flex-col items-center">
        <h2 className="font-semibold text-gray-600">Total gastado:</h2>
        <p className="text-sm text-gray-600">De todos los meses</p>
        <section className="flex w-full justify-center bg-amber-300 py-3">
          <article className="mx-2 flex">
            <p className="text-gray-800">S/</p>
            <section className="">
              {loading ? (
                <section className="animate-bounce text-2xl font-bold">...</section>
              ) : (
                <p className="text-5xl font-bold">{saldoTotal.toFixed(2)}</p>
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
