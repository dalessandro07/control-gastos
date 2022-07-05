import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { SaldoContext } from '../../../context/SaldoContext'

import useChart from '../../../hooks/useChart'
import useSeo from '../../../hooks/useSeo'

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'react-chartjs-2'
import Loading from '../../../utilities/Loading'

import ImportExport from './ImportExport'
import ListaPorEtiqueta from './ListaPorEtiqueta'
import useFiltrarGastosPorMes from '../../../hooks/useFiltrarGastosPorMes'

import { toast } from 'react-toastify'
import moment from 'moment'

Chart.register(ArcElement, Tooltip, Legend)
Chart.defaults.font.size = 17.5
Chart.defaults.font.weight = 'bold'

const Balance = () => {
  const { gastos, saldoTotal, loading, exportarGastos, importarGastos, changeTotalPorMes } =
    useContext(SaldoContext)
  const [valueInput, setValueInput] = useState(moment().format('YYYY-MM'))

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

  useEffect(() => handleChangeMonth(valueInput), [gastos, valueInput])

  useEffect(() => {
    const mesElegido = moment(valueInput).format('MMMM yyyy').toUpperCase() || 'TODOS'

    changeTotalPorMes({
      mes: gastosPorMes?.fecha?.toUpperCase() || 'De todos los meses',
      monto: gastosPorMes?.total ?? saldoTotal
    })

    if (gastos.length > 0) {
      if (valueInput && valueInput !== '') {
        if (!gastosPorMes || gastosPorMes?.gastos?.length === 0) {
          toast.error(`
            No se encontraron gastos en ${mesElegido}
          `)
        }
      }
    }
  }, [valueInput, gastosPorMes])

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
                gastos={gastosPorMes?.gastos ?? gastos}
                porcentajes={porcentajes}
              />
            ) : (
              <section className="my-6 mx-3 flex flex-col">
                <section className="mb-10 flex flex-col items-center gap-2">
                  <p className="">Viendo el balance de gastos de</p>

                  <label className="flex items-center gap-2 text-blue-800" htmlFor="filtro">
                    <h3 className="text-2xl font-bold">
                      {gastosPorMes?.fecha?.toUpperCase() ?? 'Todos los meses'}
                    </h3>

                    <input
                      ref={inputRef}
                      className="w-5 cursor-pointer bg-transparent"
                      type="month"
                      placeholder="Selecciona un mes"
                      name="filtroMes"
                      onChange={(e) => {
                        setValueInput(e.target.value)
                      }}
                      value={valueInput}
                    />
                  </label>

                  <button
                    onClick={limpiarFiltroDeMeses}
                    className="mt-4 flex items-center gap-2 rounded-sm bg-red-500 p-2 text-gray-100 transition-all duration-150 hover:bg-red-600">
                    <p className="text-sm font-semibold">Reestablecer fecha</p>
                  </button>
                </section>

                <Pie data={dataPie} options={optionsPie} />

                <ul className="mx-auto mt-8 flex w-3/4 flex-col gap-1 rounded-sm border-4 border-amber-400 p-3 shadow-lg">
                  <p className="my-2 text-center text-sm font-semibold underline">
                    Porcentaje de gastos por categoría
                  </p>
                  <p className="text-center">
                    Total: s/
                    <strong className="text-xl">
                      {gastosPorMes?.total?.toFixed(2) ?? saldoTotal.toFixed(2)}
                    </strong>
                  </p>
                  {porcentajes.length > 0 &&
                    porcentajes?.map((porcentaje) => (
                      <li
                        className="flex items-center justify-between gap-6 py-2"
                        key={porcentaje.etiqueta}>
                        <span className="font-semibold">
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
