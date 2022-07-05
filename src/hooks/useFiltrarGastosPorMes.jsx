import { useState } from 'react'

import moment from 'moment'
moment.locale('es')

const useFiltrarGastosPorMes = (gastos, inputRef) => {
  const [gastosPorMes, setGastosPorMes] = useState([])

  const filtrarGastosPorMes = (gastos) => {
    const gastosFiltrados = gastos.reduce((acumulador, gasto) => {
      const fecha = moment(gasto.fecha).format('MMMM yyyy')

      if (!acumulador[fecha]) {
        acumulador[fecha] = {
          fecha,
          fechaInput: moment(fecha, 'MMMM yyyy').format('YYYY-MM'),
          gastos: [gasto],
          total: gasto.monto
        }
      } else {
        acumulador[fecha].gastos.push(gasto)
        acumulador[fecha].total += gasto.monto
      }

      return acumulador
    }, {})

    const gastosOrdenados = Object.values(gastosFiltrados).sort((a, b) => {
      const fechaA = new Date(a.fecha)
      const fechaB = new Date(b.fecha)

      if (fechaA < fechaB) return 1
      if (fechaA > fechaB) return -1
      return 0
    })

    return gastosOrdenados
  }

  const handleChangeMonth = (value) => {
    const gastosPorMesFiltrados = filtrarGastosPorMes(gastos).find(
      (gasto) => gasto.fechaInput === value
    )

    setGastosPorMes(gastosPorMesFiltrados)
  }

  const limpiarFiltroDeMeses = () => {
    setGastosPorMes([])
    inputRef.current.value = ''
  }

  return { gastosPorMes, handleChangeMonth, limpiarFiltroDeMeses }
}

export default useFiltrarGastosPorMes
