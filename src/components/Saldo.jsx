import React from 'react'

const Saldo = ({ saldoTotal }) => {
  return (
    <header className="mt-8 flex flex-col items-center">
      <h2 className="font-semibold text-gray-600">Total gastado:</h2>
      <section className="flex w-full justify-center bg-amber-300 py-3">
        <article className="mx-2 flex">
          <p className="text-gray-800">S/</p>
          <p className="text-5xl font-bold">{saldoTotal}</p>
        </article>
      </section>
    </header>
  )
}

export default Saldo
