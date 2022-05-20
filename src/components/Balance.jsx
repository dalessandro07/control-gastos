import React, { useContext } from 'react'
import { SaldoContext } from '../context/SaldoContext'
import usePieChart from '../hooks/usePieChart'

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import Loading from './../utilities/Loading'

Chart.register(ArcElement, Tooltip, Legend)
Chart.defaults.font.size = 16
Chart.defaults.font.weight = 'bold'

const Balance = () => {
  const { gastos, loading } = useContext(SaldoContext)
  const { dataPie, optionsPie, selectedTag } = usePieChart(gastos)

  console.log(selectedTag)

  return (
    <section className="mt-8">
      <header>
        <h3 className="text-center text-lg font-semibold">Balance</h3>
      </header>

      <section className="m-8 md:w-1/2 lg:w-1/3">
        {!loading ? (
          gastos.length > 0 ? (
            <Pie data={dataPie} options={optionsPie} />
          ) : (
            <p className="text-center text-gray-500">No hay gastos registrados</p>
          )
        ) : (
          <Loading />
        )}
      </section>
    </section>
  )
}

export default Balance
