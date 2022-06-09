import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ExpiredServices = ({ servicios = [] }) => {
  const [servicesAboutToExpire, setServicesAboutToExpire] = useState([])
  const [showExpiredServices, setShowExpiredServices] = useState(false)

  const navigateTo = useNavigate()

  useEffect(() => {
    const aboutToExpire = servicios.filter(
      (servicio) =>
        moment(servicio.fecha).diff(moment(), 'days') <= 5 &&
        moment(servicio.fecha).diff(moment(), 'days') >= 0
    )

    const expired = servicios.filter(
      (servicio) => moment(servicio.fecha).diff(moment(), 'days') < 0
    )

    if (aboutToExpire) {
      setServicesAboutToExpire(aboutToExpire)
    }

    if (aboutToExpire && expired) {
      setServicesAboutToExpire([...aboutToExpire, ...expired])
    }
  }, [servicios])

  return (
    <>
      {servicesAboutToExpire?.length > 0 && (
        <section className="relative mt-6 flex flex-col items-center bg-red-100 py-5">
          {showExpiredServices && (
            <section className="-m-4 flex w-full flex-col items-center">
              <p className="mt-2 flex gap-2 p-2 text-center text-sm font-medium text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {`Hay ${
                  servicesAboutToExpire.length > 1
                    ? `${servicesAboutToExpire.length} servicios próximos`
                    : `${servicesAboutToExpire.length} servicio próximo`
                } a vencer.`}
              </p>

              <section className="mt-3 flex flex-wrap items-center gap-4">
                {servicesAboutToExpire?.map((servicio) => (
                  <section
                    onClick={() => navigateTo('/servicios')}
                    className="relative my-3 flex cursor-pointer flex-col items-center rounded-sm bg-red-200 p-2 text-orange-700 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                    key={servicio.idDB}>
                    {moment(servicio.fecha).diff(moment(), 'days') < 0 && (
                      <div className="absolute -top-3 -right-3 rounded-lg bg-red-600 px-2 text-sm text-white">
                        Vencido
                      </div>
                    )}
                    <p className="text-center text-sm font-semibold">{servicio.nombre}</p>
                    <p className="text-center text-sm font-semibold">
                      {moment(servicio.fecha).format('DD/MM/YYYY')}
                    </p>
                    <p className="text-center text-sm font-semibold">
                      {moment(servicio.fecha).fromNow()}
                    </p>
                  </section>
                ))}
              </section>
            </section>
          )}

          <button
            onClick={() => {
              setShowExpiredServices(!showExpiredServices)
            }}
            className={`${
              !showExpiredServices
                ? 'top-0 bottom-0 hover:scale-95'
                : 'right-4 top-4 hover:scale-110'
            } absolute text-orange-700 transition-all duration-200 ease-in`}>
            {showExpiredServices ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <section className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm underline">Ver servicios vencidos</p>
              </section>
            )}
          </button>
        </section>
      )}
    </>
  )
}

export default ExpiredServices
