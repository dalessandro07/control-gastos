import React, { memo, useContext } from 'react'
import { SaldoContext } from '../../../context/SaldoContext'
import useChart from '../../../hooks/useChart'

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'react-chartjs-2'
import Loading from '../../../utilities/Loading'
import useSeo from '../../../hooks/useSeo'

import ListaPorEtiqueta from './ListaPorEtiqueta'

Chart.register(ArcElement, Tooltip, Legend)
Chart.defaults.font.size = 17.5
Chart.defaults.font.weight = 'bold'

const Balance = () => {
  const { gastos, saldoTotal, loading, exportarGastos, importarGastos } = useContext(SaldoContext)

  const { dataPie, optionsPie, selectedTag, changeSelectTag, porcentajes } = useChart(
    gastos,
    saldoTotal
  )

  useSeo({ title: 'Balance', description: 'Balance de gastos' })

  return (
    <section className="relative mt-8">
      <header>
        <h3 className="text-center text-lg font-semibold">Balance</h3>
      </header>

      <section className="m-2 sm:m-4 md:m-8 md:w-1/2 lg:w-1/3">
        {!loading ? (
          gastos.length > 0 ? (
            selectedTag?.tag ? (
              <ListaPorEtiqueta
                selectedTag={selectedTag}
                changeSelectTag={changeSelectTag}
                gastos={gastos}
                porcentajes={porcentajes}
              />
            ) : (
              <section className="my-6 mx-3 flex flex-col">
                <Pie data={dataPie} options={optionsPie} />
                <ul className="mx-auto mt-8 flex w-3/4 flex-col gap-1 rounded-sm border-2 border-amber-400 p-3">
                  <p className="my-2 text-center text-sm underline">
                    Porcentaje de gastos por categoría
                  </p>
                  {porcentajes.length > 0 &&
                    porcentajes?.map((porcentaje) => (
                      <li
                        className="flex items-center justify-between gap-6 py-2"
                        key={porcentaje.etiqueta}>
                        <span className="font-bold">
                          {porcentaje.etiqueta.charAt(0).toUpperCase() +
                            porcentaje.etiqueta.slice(1)}
                        </span>
                        <span className="text-xl">{porcentaje.porcentaje.toFixed(1)}%</span>
                      </li>
                    ))}
                </ul>
              </section>
            )
          ) : (
            <p className="text-center text-gray-500">No hay gastos registrados</p>
          )
        ) : (
          <Loading />
        )}
      </section>

      <footer className="m-4 flex justify-center">
        {!loading && (
          <>
            <section
              onClick={importarGastos}
              className="m-4 flex w-max cursor-pointer rounded-sm bg-gray-200 p-3 hover:bg-gray-300">
              <h4 className="mr-2 text-sm font-bold">Importar gastos</h4>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                  clipRule="evenodd"
                />
              </svg>
            </section>

            <section
              onClick={exportarGastos}
              className="m-4 flex w-max cursor-pointer rounded-sm bg-gray-200 p-3 hover:bg-gray-300">
              <h4 className="mr-2 text-sm font-bold">Exportar gastos</h4>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
            </section>
          </>
        )}
      </footer>
    </section>
  )
}

export default memo(Balance)
