import React, { useContext } from 'react'
import { SaldoContext } from './../context/SaldoContext'
import moment from 'moment'
import 'moment/dist/locale/es'
import Loading from '../utilities/Loading'
moment.locale('es')

const ListaDeGastos = ({ gastos }) => {
  const { loading } = useContext(SaldoContext)

  gastos?.sort((a, b) => (moment(a.fecha).isBefore(b.fecha) ? 1 : -1))

  return (
    <section className="mt-8">
      <header className="flex justify-center">
        <h3 className="text-lg font-bold">Historial de gastos</h3>
      </header>

      <ul>
        {loading ? (
          <Loading />
        ) : (
          gastos?.map((gasto) => {
            return (
              <li className="my-4 flex items-center justify-between py-2" key={gasto.id}>
                <section className="flex grow items-center">
                  <img
                    className="mr-2 h-12 w-12 rounded-full object-cover"
                    src={
                      gasto.img ??
                      'https://st4.depositphotos.com/34463872/41265/v/450/depositphotos_412656562-stock-illustration-shopping-bag-design-icon-shopping.jpg'
                    }
                    alt=""
                  />

                  <p className="grow overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                    {gasto.descripcion}
                  </p>
                </section>

                <p className="w-1/3 text-right text-sm">
                  {moment(gasto.fecha).format('DD MMMM YYYY')}
                </p>

                <section className="flex w-1/4 items-center justify-end text-red-500">
                  <p className="text-sm">- S/</p>
                  <p className="text-xl font-bold">{gasto.monto}</p>
                </section>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default ListaDeGastos
