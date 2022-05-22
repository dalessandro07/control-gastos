import React from 'react'

import Gasto from './Gasto'
import Loading from '../utilities/Loading'
import GastoLoading from './../utilities/GastoLoading'

const ListaDeGastos = ({ gastos, moment, loading }) => {
  return (
    <section className="mx-3 mt-8">
      <header className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold">Historial de gastos</h3>
      </header>

      <ul>
        {gastos.length > 0 ? (
          <>
            {gastos.map((gasto) => (
              <Gasto key={gasto.id} moment={moment} gasto={gasto} />
            ))}
            {loading && <GastoLoading />}
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
              href="https://www.pexels.com/es-es/">
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
