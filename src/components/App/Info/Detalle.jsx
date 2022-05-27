import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { borrarGastoDB } from '../../../firebase'

import { SaldoContext } from '../../../context/SaldoContext'

import { toast } from 'react-toastify'
import Loading from '../../../utilities/Loading'
import moment from 'moment'
import Modal from '../../../utilities/Modal'
import useSeo from '../../../hooks/useSeo'
import { useAuth } from '../../../context/AuthContext'

const Detalle = ({ gastos }) => {
  const { userUID } = useAuth()
  const { loading } = useContext(SaldoContext)
  const { id } = useParams()
  const navigateTo = useNavigate()

  const detalleGasto = gastos.find((gasto) => gasto.id === Number(id)) || {}

  useSeo({
    title: 'Detalles',
    description: `Detalle del gasto ${id} - ${detalleGasto.descripcion}`
  })

  const sendGastoURL = () => {
    const { descripcion, monto, fecha, etiqueta } = detalleGasto

    const URLBASE = 'https://allexpenses.netlify.app/nuevo-gasto/formulario'

    const query = new URLSearchParams({
      descripcion,
      monto,
      fecha,
      etiqueta
    })

    const URL = `${URLBASE}?${query}`

    navigator.clipboard.writeText(URL)

    toast.success('URL copiada al portapapeles, puedes compartirla')
  }

  return (
    <section className="relative">
      <header className="flex items-center justify-center">
        <h1 className="my-5 text-center font-bold">Detalle del gasto</h1>

        <section onClick={() => navigateTo(-1)} className="absolute left-0 mx-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </section>

        <section
          onClick={() => {
            navigateTo(`/editar-gasto/${id}/formulario`)
          }}
          className="absolute right-0 mx-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </section>
      </header>

      <article>
        {loading ? (
          <Loading />
        ) : detalleGasto.monto ? (
          <section className="flex flex-col items-center justify-center">
            <img
              className="mr-2 h-14 w-14 min-w-[60px] rounded-full object-cover"
              src={
                detalleGasto?.img ??
                'https://st4.depositphotos.com/34463872/41265/v/450/depositphotos_412656562-stock-illustration-shopping-bag-design-icon-shopping.jpg'
              }
              alt=""
            />

            <section className="flex items-center text-red-500">
              <p className="text-xl">s/</p>
              <p className="mt-4 text-3xl"> {detalleGasto?.monto?.toFixed(2)}</p>
            </section>

            <p className="text-lg font-semibold">{detalleGasto?.descripcion}</p>

            <p className="text-gray-500">{detalleGasto?.etiqueta}</p>

            <section className="flex">
              <p className="mx-2">{moment(detalleGasto?.fecha).format('DD/MM/YYYY')}</p>
            </section>
          </section>
        ) : (
          <p className="text-center text-gray-500">No se encontró el gasto</p>
        )}
      </article>

      <footer className="my-8 flex flex-col items-center gap-6">
        {!loading && (
          <>
            <button
              onClick={sendGastoURL}
              className="flex gap-4 rounded-sm bg-sky-600 p-2 text-gray-100 duration-200 hover:animate-pulse">
              <p>Enviar gasto</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <Modal
              textButtonModal="Eliminar Gasto"
              titleModal="¿Desea eliminar este gasto? ⚠️"
              paragraphModal="Esta acción no se puede deshacer. ¿Está seguro?"
              callbackButtonConfirm={() => {
                borrarGastoDB(detalleGasto?.idDB, userUID)
                toast.info('Gasto eliminado correctamente')
                navigateTo('/gastos')
              }}
            />
          </>
        )}
      </footer>
    </section>
  )
}

export default Detalle
