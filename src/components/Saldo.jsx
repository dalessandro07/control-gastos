import React, { useContext } from 'react'
import { SaldoContext } from '../context/SaldoContext'

const Saldo = ({ saldoTotal }) => {
  const { loading } = useContext(SaldoContext)

  return (
    <header className="mt-8 flex flex-col items-center">
      <h2 className="font-semibold text-gray-600">Total gastado:</h2>
      <section className="flex w-full justify-center bg-amber-300 py-3">
        <article className="mx-2 flex">
          <p className="text-gray-800">S/</p>
          <p className="text-5xl font-bold">
            {loading ? <p className="animate-bounce">...</p> : saldoTotal.toFixed(2)}
          </p>
        </article>
      </section>
    </header>
  )
}

export default Saldo
