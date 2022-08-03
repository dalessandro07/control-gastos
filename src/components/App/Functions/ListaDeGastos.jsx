import React from 'react'

import Gasto from '../info/Gasto'
import Loading from '../../../utilities/Loading'
import GastoLoading from '../../../utilities/GastoLoading'
import useSeo from '../../../hooks/useSeo'

const ListaDeGastos = ({ gastos, moment, loading }) => {
  gastos?.sort((a, b) => (moment(a.fecha).isBefore(b.fecha) ? 1 : -1))

  useSeo({
    title: 'Lista de gastos',
    description: 'Lista de todos los gastos registrados'
  })

  return (
    <section className="mx-3 mt-8">
      <header className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold">Historial de gastos</h3>
        <p className="text-sm text-gray-600">
          Total de gastos: <span className="font-bold">{gastos.length}</span>
        </p>
      </header>

      <ul>
        {gastos.length > 0 ? (
          <>
            {loading && <GastoLoading />}
            {gastos.map(gasto => (
              <Gasto key={gasto.id} moment={moment} gasto={gasto} />
            ))}
          </>
        ) : loading ? (
          <Loading />
        ) : (
          <p className="text-center text-gray-500">No hay gastos registrados</p>
        )}
      </ul>

      <footer className="m-4 flex flex-col">
        <section className="flex justify-end">
          <h2 className="text-center font-dosis text-sm">
            Fotos de{' '}
            <a
              className="border-b-2 border-amber-300 font-bold"
              href="https://www.pexels.com/es-es/"
              target="_blank"
              rel="noopener noreferrer">
              Pexels
            </a>
          </h2>
          <img className="ml-2 w-12" src="https://images.pexels.com/lib/api/pexels.png" alt="" />
        </section>
      </footer>
    </section>
  )
}

export default ListaDeGastos
