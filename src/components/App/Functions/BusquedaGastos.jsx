import React, { useState } from 'react'

import moment from 'moment'

const BusquedaGastos = ({ gastos, gastosAMostrar, setGastosAMostrar }) => {
  const [busqueda, setBusqueda] = useState('')

  const buscarGastoPorParametro = (e) => {
    const { value } = e.target
    setBusqueda(value)

    const gastosFiltrados = gastos.filter((gasto) => {
      return (
        gasto.descripcion.toLowerCase().includes(value.toLowerCase()) ||
        moment(gasto.fecha).format('DD [de] MMMM [de] YYYY').includes(value.toLowerCase()) ||
        gasto.monto.toFixed(2).toString().includes(value)
      )
    })

    if (gastosFiltrados && gastosFiltrados.length > 0) {
      setGastosAMostrar(gastosFiltrados)
    } else {
      setGastosAMostrar(null)
    }
  }

  return (
    <>
      <section className="mt-5 flex w-full flex-col gap-4 p-3 px-10">
        <h2 className="mb-3 font-bold">Busca un gasto:</h2>

        <div className="flex justify-around gap-4 xs:justify-center">
          <input
            className="border-b-2 border-black bg-transparent px-2 placeholder:text-gray-600 xs:grow"
            type="text"
            placeholder="Buscar gasto..."
            name="barraBusqueda"
            id="buscarGasto"
            onChange={buscarGastoPorParametro}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </section>

      <p className="mb-3 text-center text-xs text-gray-600">
        Puedes buscar por fecha, descripción o monto.
      </p>

      {busqueda && gastosAMostrar && gastosAMostrar?.length !== gastos?.length ? (
        <p className="my-4 text-center">
          Mostrando <strong className="pr-2">{gastosAMostrar?.length}</strong>
          de <strong className="pr-2">{gastos?.length}</strong>
          <span className="mr-2">{gastos.length === 1 ? 'gasto' : 'gastos'}</span>
          para: <strong>{busqueda}</strong>
        </p>
      ) : (
        <p className="mt-5 text-center">Mostrando todos los gastos</p>
      )}
    </>
  )
}

export default BusquedaGastos
