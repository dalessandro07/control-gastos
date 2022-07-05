import React from 'react'
import moment from 'moment'

const dictionarieColors = {
  luz: {
    bg100: 'bg-amber-100',
    bg300: 'bg-amber-200',
    bg500: 'hover:bg-amber-500',
    border: 'border-amber-400',
    text100: 'hover:text-amber-100',
    text500: 'text-amber-500'
  },
  agua: {
    bg100: 'bg-blue-100',
    bg300: 'bg-blue-200',
    bg500: 'hover:bg-blue-500',
    border: 'border-blue-400',
    text100: 'hover:text-blue-100',
    text500: 'text-blue-500'
  },
  inter: {
    bg100: 'bg-green-100',
    bg300: 'bg-green-200',
    bg500: 'hover:bg-green-500',
    border: 'border-green-400',
    text100: 'hover:text-green-100',
    text500: 'text-green-500'
  },
  gas: {
    bg100: 'bg-orange-100',
    bg300: 'bg-orange-200',
    bg500: 'hover:bg-orange-500',
    border: 'border-orange-400',
    text100: 'hover:text-orange-100',
    text500: 'text-orange-500'
  },
  tel: {
    bg100: 'bg-purple-100',
    bg300: 'bg-purple-200',
    bg500: 'hover:bg-purple-500',
    border: 'border-purple-400',
    text100: 'hover:text-purple-100',
    text500: 'text-purple-500'
  },
  default: {
    bg100: 'bg-slate-100',
    bg300: 'bg-slate-200',
    bg500: 'hover:bg-slate-500',
    border: 'border-slate-400',
    text100: 'hover:text-slate-100',
    text500: 'text-slate-500'
  }
}

const ContainerServices = ({ servicios, agregarServicioComoGasto }) => {
  return (
    <ul className="my-5 mx-4 flex flex-wrap justify-around gap-4">
      {servicios.map((servicio, index) => {
        const keys = Object.keys(dictionarieColors)

        const serviceColor =
          dictionarieColors[
            keys.find(
              (key) =>
                servicio?.nombre?.toLowerCase().includes(key) ||
                servicio?.descripcion?.toLowerCase().includes(key)
            )
          ] || dictionarieColors.default

        return (
          <li key={index} className="flex flex-col shadow-md">
            <section
              className={`${serviceColor.bg100} ${serviceColor.border} flex flex-col items-center rounded-t-md border-x-2 border-t-2 py-3`}>
              <span className="text-xl font-bold">{servicio.nombre.toUpperCase()}</span>

              <span className={`${serviceColor.text500} font-bold`}>
                S/{servicio.monto.toFixed(2)}
              </span>

              <span
                className={`${
                  servicio.fecha < moment().format('YYYY-MM-DD') &&
                  'font-bold text-red-500 underline'
                } text-sm font-semibold`}>
                {moment(servicio.fecha).format('DD-MM-YYYY')}
              </span>
            </section>

            <button
              onClick={() => agregarServicioComoGasto(servicio)}
              className={`${serviceColor.bg300} p-2 font-semibold transition-all duration-150 ${serviceColor.bg500} ${serviceColor.text100}`}>
              Registrar servicio
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ContainerServices
