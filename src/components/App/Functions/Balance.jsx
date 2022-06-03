import React, { memo, useContext, useRef } from 'react'
import { SaldoContext } from '../../../context/SaldoContext'
import useChart from '../../../hooks/useChart'

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'react-chartjs-2'
import Loading from '../../../utilities/Loading'
import useSeo from '../../../hooks/useSeo'

import ImportExport from './ImportExport'
import ListaPorEtiqueta from './ListaPorEtiqueta'
import useFiltrarGastosPorMes from '../../../hooks/useFiltrarGastosPorMes'

Chart.register(ArcElement, Tooltip, Legend)
Chart.defaults.font.size = 17.5
Chart.defaults.font.weight = 'bold'

const Balance = () => {
  const { gastos, saldoTotal, loading, exportarGastos, importarGastos } = useContext(SaldoContext)

  const inputRef = useRef(null)

  const { gastosPorMes, handleChangeMonth, limpiarFiltroDeMeses } = useFiltrarGastosPorMes(
    gastos,
    inputRef
  )

  const { dataPie, optionsPie, selectedTag, changeSelectTag, porcentajes } = useChart(
    gastosPorMes?.gastos ?? gastos,
    gastosPorMes?.total ?? saldoTotal
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
                <section className="mt-3 flex flex-col items-center gap-2">
                  <p className="">Viendo el balance de gastos de</p>
                  <h3 className="text-xl font-bold">
                    {gastosPorMes?.fecha?.toUpperCase() ?? 'Todos los meses'}
                  </h3>
                </section>

                <section className="my-14 flex flex-col items-center justify-center gap-4 overflow-x-auto">
                  <input
                    ref={inputRef}
                    className="border-b-2 border-sky-500 bg-transparent pb-2"
                    type="month"
                    name="filtroMes"
                    id="filtro"
                    onChange={(e) => handleChangeMonth(e)}
                  />
                  <button
                    onClick={limpiarFiltroDeMeses}
                    className="flex items-center gap-2 rounded-sm bg-red-500 p-2 text-gray-100">
                    <p className="text-sm">Limpiar</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </section>

                <Pie data={dataPie} options={optionsPie} />

                <ul className="mx-auto mt-8 flex w-3/4 flex-col gap-1 rounded-sm border-2 border-amber-400 p-3">
                  <p className="my-2 text-center text-sm underline">
                    Porcentaje de gastos por categoría
                  </p>
                  <p className="text-center">
                    Total: s/
                    <strong>{gastosPorMes?.total?.toFixed(2) ?? saldoTotal.toFixed(2)}</strong>
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
          <ImportExport importarGastos={importarGastos} exportarGastos={exportarGastos} />
        )}
      </footer>
    </section>
  )
}

export default memo(Balance)
