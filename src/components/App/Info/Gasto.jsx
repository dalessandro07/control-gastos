import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDivisas } from '../../../context/DivisasContext'
import useResizeWindow from '../../../hooks/useResizeWindow'

const Gasto = ({ gasto, moment }) => {
  const { divisaActual } = useDivisas()
  const navigateTo = useNavigate()
  const { width } = useResizeWindow()

  return (
    <li
      onClick={() => navigateTo(`/gastos/${gasto.id}`)}
      className="my-4 flex cursor-pointer items-center justify-between p-2 hover:bg-gray-300 hover:transition-all hover:duration-200"
      key={gasto.id}>
      <section className="flex w-1/3 grow items-center">
        <img
          className="mr-2 h-12 w-12 min-w-[48px] rounded-full object-cover"
          src={
            gasto.img ??
            'https://st4.depositphotos.com/34463872/41265/v/450/depositphotos_412656562-stock-illustration-shopping-bag-design-icon-shopping.jpg'
          }
          alt=""
        />

        <p className="mr-4 grow overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {gasto.descripcion}
        </p>
      </section>

      {width > 480 ? (
        <p className="w-1/3 text-right text-sm">
          {moment(gasto.fecha).format('DD [de] MMMM [de] YYYY')}
        </p>
      ) : (
        <p className="mx-2 w-max text-right text-xs font-medium">
          {moment(gasto.fecha).format('DD-MM-YY')}
        </p>
      )}

      <section className="ml-4 flex items-center justify-end text-red-500">
        <p className="text-sm">- {divisaActual?.divisa}</p>
        <p className="text-xl font-bold">{gasto.monto.toFixed(2)}</p>
      </section>
    </li>
  )
}

export default Gasto
