import React, { useContext, useState, useEffect } from 'react'
import { SaldoContext } from '../../../context/SaldoContext'
import ExpiredServices from '../Functions/ExpiredServices'

const Saldo = () => {
  const { gastos, saldoTotal, servicios, loading, totalPorMes } = useContext(SaldoContext)

  const [saldoAMostrar, setSaldoAMostrar] = useState(saldoTotal)

  useEffect(() => {
    const mes = totalPorMes?.mes

    if (saldoTotal > 0) {
      if (mes) {
        if (totalPorMes?.monto === 0 || !totalPorMes?.monto) {
          setSaldoAMostrar(saldoTotal.toFixed(2))
        } else {
          setSaldoAMostrar(totalPorMes?.monto?.toFixed(2))
        }
      } else {
        setSaldoAMostrar(saldoTotal.toFixed(2))
      }
    }
  }, [gastos, saldoTotal, totalPorMes])

  return (
    <>
      <header className="mt-8 flex flex-col items-center">
        <h2 className="font-semibold text-gray-600">Total gastado:</h2>
        <p className="text-sm text-gray-600">{totalPorMes?.mes || 'De todos los meses'}</p>
        <section className="flex w-full justify-center bg-amber-300 py-3">
          <article className="mx-2 flex">
            <p className="text-gray-800">S/</p>
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
