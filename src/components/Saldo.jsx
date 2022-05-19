import React from 'react'

const Saldo = ({ saldoTotal }) => {
  return (
    <header className="mt-8 flex justify-center bg-amber-300">
      <section className="flex items-center py-3">
        <h2 className="text-sm font-semibold">Total gastado:</h2>

        <article className="mx-2 flex">
          <p className="text-sm">S/</p>
          <p className="text-4xl font-bold">{saldoTotal}</p>
        </article>
      </section>
    </header>
  )
}

export default Saldo
