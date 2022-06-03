import moment from 'moment'
import { useState } from 'react'
moment.locale('es')

const useFiltrarGastosPorMes = (gastos, inputRef) => {
  const [gastosPorMes, setGastosPorMes] = useState([])

  const filtrarGastosPorMes = (gastos) => {
    const gastosFiltrados = gastos.reduce((acumulador, gasto) => {
      const mes = new Date(gasto.fecha).getMonth()
      const anio = new Date(gasto.fecha).getFullYear()

      const fecha = moment(new Date(anio, mes)).format('MMMM yyyy')

      if (!acumulador[fecha]) {
        acumulador[fecha] = {
          fecha,
          fechaInput: moment(new Date(anio, mes)).format('YYYY-MM'),
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

  const handleChangeMonth = (e) => {
    const { value } = e.target

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
