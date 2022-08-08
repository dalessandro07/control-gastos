import React from 'react'

import { useDivisasContext } from '../../../context/DivisasContext'

import useShowSaldo from './hooks/useShowSaldo'
import ExpiredServices from '../servicios/ExpiredServices'

import { Ring } from '@uiball/loaders'

const Saldo = () => {
  const { divisaActual } = useDivisasContext()
  const { mesActual, saldoAMostrar, loading, servicios, totalPorMes, saldoTotal } = useShowSaldo()

  return (
    <>
      <div className="mt-8 flex flex-col items-start">
        <header className="p-2 px-6">
          <p className="flex gap-1 text-sm">
            Total gastado,
            <span className="font-bold lowercase">
              {mesActual === totalPorMes.mes ? 'Este mes' : totalPorMes.mes}.
            </span>
          </p>
        </header>

        <section className="flex w-full justify-start py-2 px-4">
          <article className="mx-2 flex items-center gap-2">
            <p className="text-2xl text-gray-800">{divisaActual?.divisa}</p>

            {loading ? (
              <Ring size={30} lineWeight={5} speed={2} color="black" />
            ) : (
              <p className="text-5xl font-bold xsm:text-6xl">
                {saldoAMostrar || saldoTotal?.toFixed(2)}
              </p>
            )}
          </article>
        </section>
      </div>

      <ExpiredServices servicios={servicios} />
    </>
  )
}

export default Saldo
