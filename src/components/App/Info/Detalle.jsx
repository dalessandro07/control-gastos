import React, { useContext, useState } from 'react'
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
  const [mode, setMode] = useState('copy-link')

  const detalleGasto = gastos.find((gasto) => gasto.id === Number(id)) || {}

  useSeo({
    title: 'Detalles',
    description: `Detalle del gasto ${id} - ${detalleGasto.descripcion}`
  })

  const sendGastoURL = (mode) => {
    if (mode === 'copy-link') {
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

      toast.success('¡Link copiado al portapapeles, puedes compartirlo!')
    } else {
      const { descripcion, monto, fecha, etiqueta } = detalleGasto

      const URLBASE = 'https://wa.me/'

      const query = new URLSearchParams({
        text: `Realicé este gasto: \n *${
          descripcion.charAt(0).toUpperCase() + descripcion.slice(1)
        }* - S/ *${monto.toFixed(2)}*. \n El día *${fecha}*. \n Etiqueta: *${etiqueta}*`
      })

      const URL = `${URLBASE}?${query}`

      window.open(URL, '_blank')

      toast.success('¡Gasto compartido!')
    }
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

            <p className="mx-auto w-3/5 py-3 text-center text-lg font-semibold">
              {detalleGasto?.descripcion}
            </p>

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
            <Modal
              titleModal="Enviar gasto"
              paragraphModal="¿Por qué medio deseas compartir el gasto?"
              textButtonModal="Compartir"
              bgc={'bg-sky-600 hover:bg-sky-700'}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              }
              callbackButtonConfirm={() => sendGastoURL(mode)}
              textButtonConfirm="Compartir gasto"
              moreElements={
                <section className="flex flex-col items-center gap-2">
                  <button
                    className={`${
                      mode === 'copy-link' ? 'bg-green-200' : 'bg-green-300 p-3 text-xl shadow-lg'
                    } m-4 flex items-center gap-4 rounded-sm p-2`}
                    onClick={() => {
                      setMode('whatsapp')
                    }}>
                    WhatsApp
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24">
                      <path
                        fill="#16a34a"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`${
                      mode === 'copy-link'
                        ? 'bg-sky-500 p-3 text-lg text-gray-100 shadow-lg'
                        : 'bg-sky-200 text-gray-900'
                    } m-4 flex items-center gap-1 rounded-sm p-2`}
                    onClick={() => setMode('copy-link')}>
                    Copiar enlace
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </section>
              }
            />

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
