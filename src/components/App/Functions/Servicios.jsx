import React, { useContext } from 'react'

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
    default: 'gray'
  }

  return (
    <section className="mt-8 flex flex-col">
      <header>
        <h3 className="text-center text-lg font-semibold">Servicios</h3>
        <section className="mx-6 my-4 flex flex-col items-center">
          <p className="text-center text-sm text-gray-600">
            Ahorra tiempo al registrar gastos de servicios que no varían, como por ejemplo:
          </p>
          <p className="font-bold text-blue-500">Luz, Agua o Internet</p>
        </section>
      </header>

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

      <section className="my-8 flex flex-col items-center gap-5">
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
              <label className="text-sm text-gray-600">Fecha de vencimiento de pago</label>
              <input
                className="rounded-sm border-2 p-2"
                {...register('fecha')}
                value={fechaDefault}
                onChange={(e) => cambiarFecha(e.target.value)}
                type="date"
              />
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
            className="rounded-sm bg-amber-300 p-2 font-bold shadow-sm transition-all duration-150 hover:translate-y-1 hover:bg-amber-400"
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
              Eliminar servicio
            </button>
          )}
        </div>
      </section>
    </section>
  )
}

export default Servicios
