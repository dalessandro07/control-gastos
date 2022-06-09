import React, { useContext, memo, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SaldoContext } from '../../../context/SaldoContext'

import FormError from '../../../utilities/FormError'
import Loading from '../../../utilities/Loading'
import Modal from '../../../utilities/Modal'
import { validationSchemaServices } from '../../../utilities/ValidationSchema'
import useHandleServices from '../../../hooks/useHandleServices'

import moment from 'moment'

const Servicios = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onChange', resolver: yupResolver(validationSchemaServices) })

  const [servicesAboutToExpire, setServicesAboutToExpire] = useState([])

  const { servicios, loading } = useContext(SaldoContext)

  const {
    agregarServicioComoGasto,
    handleDeleteService,
    onAddService,
    setShowFormNewService,
    setShowFormDeleteService,
    setServicioABorrar,
    servicioABorrar,
    existeServicioABorrar,
    showFormDeleteService,
    showFormNewService,
    cambiarFecha,
    fechaDefault
  } = useHandleServices()

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

  useEffect(() => {
    const aboutToExpire = servicios.filter(
      (servicio) =>
        moment(servicio.fecha).diff(moment(), 'days') <= 5 &&
        moment(servicio.fecha).diff(moment(), 'days') >= 0
    )

    if (aboutToExpire) {
      setServicesAboutToExpire(aboutToExpire)
    }
  }, [servicios])

  return (
    <section className="mt-8 flex flex-col">
      <header>
        <h3 className="text-center text-lg font-semibold">Servicios o gastos fijos</h3>
        <section className="mx-6 my-4 flex flex-col items-center">
          <p className="text-center text-sm text-gray-600">
            Ahorra tiempo al registrar servicios o gastos que no varían, como por ejemplo:
          </p>
          <p className="mt-2 text-sm font-bold text-blue-500">Internet o teléfono</p>
        </section>
      </header>

      {servicesAboutToExpire?.length > 0 && (
        <section className="flex flex-col items-center bg-red-100">
          <p className="flex gap-2 p-2 text-center text-sm font-medium text-red-600">
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
            Tienes servicios que expiran en los próximos 5 días:
          </p>
          <section className="flex flex-wrap items-center gap-4 pb-2">
            {servicesAboutToExpire?.map((servicio) => (
              <section
                className="flex flex-col items-center rounded-sm bg-red-200 p-2 shadow-sm"
                key={servicio.idDB}>
                <p className="text-center text-sm font-semibold text-orange-700">
                  {servicio.nombre}
                </p>
                <p className="text-center text-sm font-semibold text-orange-700">
                  {moment(servicio.fecha).format('DD/MM/YYYY')}
                </p>
              </section>
            ))}
          </section>
        </section>
      )}

      <section>
        {loading ? (
          <Loading />
        ) : (
          servicios.length > 0 && (
            <ul className="my-5 mx-4 flex flex-wrap justify-around gap-4">
              {servicios.map((servicio, index) => {
                const keys = Object.keys(dictionarieColors)

                const serviceColor =
                  dictionarieColors[
                    keys.find(
                      (key) =>
                        servicio.nombre.toLowerCase().includes(key) ||
                        servicio.descripcion.toLowerCase().includes(key)
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

                      <span className="text-sm">{moment(servicio.fecha).format('DD-MM-YYYY')}</span>
                    </section>

                    <button
                      onClick={() => agregarServicioComoGasto(servicio)}
                      className={`${serviceColor.bg300} p-2 font-semibold transition-all duration-150 ${serviceColor.bg500} ${serviceColor.text100}`}>
                      Agregar servicio
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        )}
      </section>

      <footer className="my-8 flex flex-col items-center gap-5">
        {showFormNewService && (
          <form onSubmit={handleSubmit(onAddService)} className="mx-16 mb-8 flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Nombre del servicio:</label>

              <input
                className="rounded-sm border-2 p-2"
                {...register('nombre')}
                type="text"
                placeholder="Ej. Internet"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Monto fijo a pagar:</label>

              <input
                className="rounded-sm border-2 p-2"
                {...register('monto')}
                type="number"
                placeholder="Ej. 100"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Fecha límite de pago (día)</label>
              <input
                className="rounded-sm border-2 p-2"
                {...register('fecha')}
                value={Number(fechaDefault)}
                onChange={(e) => cambiarFecha(e.target.value)}
                type="number"
              />
              <section className="mt-2 flex items-center gap-2">
                <input type="checkbox" disabled id="notif" {...register('notificaciones')} />
                <label htmlFor="notif" className="text-sm text-gray-500">
                  Activar notificaciones (en desarrollo)
                </label>
              </section>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Descripción:</label>

              <textarea
                {...register('descripcion')}
                className="min-h-[100px] resize-y rounded-sm border-2 p-2"
                placeholder="Ej. Internet de la casa."
              />
            </div>

            <FormError errors={errors} />

            <button
              className={`${
                errors.nombre || errors.monto || errors.fecha || errors.descripcion
                  ? 'cursor-not-allowed bg-red-300 opacity-60'
                  : 'cursor-pointer bg-blue-300 transition-all duration-200 hover:bg-blue-500 hover:text-blue-100'
              } rounded-sm p-2 font-bold shadow-md`}>
              Guardar
            </button>
          </form>
        )}

        {showFormDeleteService && (
          <section className="mx-16 flex flex-col gap-2">
            <input
              onChange={(e) => setServicioABorrar(e.target.value)}
              type="text"
              placeholder="Ingrese el servicio"
              className="rounded-md border-2 border-gray-200 p-2"
            />

            {existeServicioABorrar ? (
              <Modal
                callbackButtonConfirm={() => handleDeleteService(servicioABorrar)}
                textButtonModal="Eliminar"
                css="flex justify-center gap-2 p-2"
                titleModal="¿Desea eliminar este servicio?"
                paragraphModal={`Está a punto de eliminar el servicio "${
                  servicioABorrar.charAt(0).toUpperCase() + servicioABorrar.slice(1)
                }", esta acción no se puede deshacer. ¿Desea continuar?`}
                textButtonConfirm="Sí, eliminar"
              />
            ) : (
              ''
            )}
          </section>
        )}

        <div className="flex flex-col gap-4">
          <button
            className="rounded-sm bg-amber-300 p-2 font-bold shadow-sm transition-all duration-150 hover:bg-amber-400"
            onClick={() => {
              setShowFormNewService(!showFormNewService)
              setShowFormDeleteService(false)
            }}>
            {showFormNewService ? 'Cerrar' : 'Nuevo servicio'}
          </button>

          {servicios?.length > 0 && (
            <button
              onClick={() => {
                setShowFormDeleteService(!showFormDeleteService)
                setShowFormNewService(false)
              }}
              className="text-sm text-gray-500 underline transition-all duration-200 hover:text-black">
              {showFormDeleteService ? 'Cerrar' : 'Eliminar servicio'}
            </button>
          )}
        </div>
      </footer>
    </section>
  )
}

export default memo(Servicios)
