import useEtiquetas from './useEtiquetas'

const useChart = (gastos = [], saldoTotal) => {
  const { etiquetas, etiquetasCapitalized, changeSelectTag, selectedTag } = useEtiquetas(gastos)

  const dataPie = {
    labels: etiquetasCapitalized,
    datasets: [
      {
        data: etiquetas.map((etiqueta) => {
          return gastos
            .filter((gasto) => gasto.etiqueta === etiqueta)
            .reduce((acc, gasto) => acc + gasto.monto, 0)
        }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
        ],
        hoverOffset: 4
      }
    ]
  }

  const optionsPie = {
    plugins: {
      tooltip: {
        padding: 15,
        boxPadding: 10
      },
      legend: {
        labels: {
          boxHeight: 20
        }
      }
    },
    onClick: (e, item) => {
      const itemEtiqueta = dataPie.labels[item[0]?.index]
      const itemMonto = dataPie.datasets[0]?.data[item[0]?.index]

      changeSelectTag({ tag: itemEtiqueta, monto: itemMonto })
    }
  }

  const porcentajes = etiquetas.map((etiqueta) => {
    const gastosEtiqueta = gastos.filter((gasto) => gasto.etiqueta === etiqueta)
    const montoTotal = gastosEtiqueta.reduce((acc, gasto) => acc + gasto.monto, 0)
    const porcentaje = (montoTotal / saldoTotal) * 100

    return {
      etiqueta,
      montoTotal,
      porcentaje
    }
  })

  porcentajes.sort((a, b) => b.porcentaje - a.porcentaje)

  return { dataPie, optionsPie, selectedTag, changeSelectTag, porcentajes }
}

export default useChart
