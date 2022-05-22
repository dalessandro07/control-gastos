import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SaldoContext } from '../context/SaldoContext'
import Loading from '../utilities/Loading'
import moment from 'moment'

const Detalle = ({ gastos }) => {
  const { id } = useParams()
  const { loading } = useContext(SaldoContext)

  const detalleGasto = gastos.find((gasto) => gasto.id === Number(id)) || {}

  return (
    <section>
      <h1 className="my-5 text-center font-bold">Detalle del gasto</h1>

      <article>
        {loading ? (
          <Loading />
        ) : (
          <section className="flex flex-col items-center justify-center">
            <img
              className="mr-2 h-14 w-14 min-w-[60px] rounded-full object-cover"
              src={
                detalleGasto?.img ??
                'https://st4.depositphotos.com/34463872/41265/v/450/depositphotos_412656562-stock-illustration-shopping-bag-design-icon-shopping.jpg'
              }
              alt=""
            />

            <p className="mt-4 text-2xl text-red-500">s/ {detalleGasto?.monto?.toFixed(2)}</p>

            <p className="text-gray-500">{detalleGasto?.etiqueta}</p>

            <p className="text-lg font-semibold">{detalleGasto?.descripcion}</p>

            <section className="flex">
              <p className="mx-2 text-gray-700">{moment(detalleGasto?.fecha).fromNow()}</p>
              <p className="mx-2">{moment(detalleGasto?.fecha).format('DD/MM/YYYY')}</p>
            </section>
          </section>
        )}
      </article>
    </section>
  )
}

export default Detalle
