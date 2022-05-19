import React, { useContext } from 'react'
import { SaldoContext } from '../context/SaldoContext'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
Chart.register(ArcElement, Tooltip, Legend)
Chart.defaults.font.size = 16
Chart.defaults.font.weight = 'bold'

const Balance = () => {
  const { gastos } = useContext(SaldoContext)

  const etiquetas = gastos.reduce(
    (acc, gasto) => (acc.includes(gasto.etiqueta) ? acc : [...acc, gasto.etiqueta]),
    []
  )

  const etiquetasCapitalized = etiquetas.map(
    (etiqueta) => etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)
  )

  const data = {
    labels: etiquetasCapitalized,
    datasets: [
      {
        data: etiquetas.map((etiqueta) => {
          return gastos
            .filter((gasto) => gasto.etiqueta === etiqueta)
            .reduce((acc, gasto) => acc + gasto.monto, 0)
        }),
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <section className="mt-8">
      <header>
        <h3 className="text-center text-lg font-semibold">Balance</h3>
      </header>

      <section className="my-8">
        {gastos.length > 0 ? (
          <Pie
            data={data}
            options={{
              plugins: {
                tooltip: {
                  padding: 15,
                  boxPadding: 10
                },
                legend: {
                  labels: {
                    font: {
                      size: 18
                    },
                    boxHeight: 20
                  }
                }
              }
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No hay gastos registrados</p>
        )}
      </section>
    </section>
  )
}
export default Balance
