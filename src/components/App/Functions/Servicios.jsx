import React, { useContext, memo } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SaldoContext } from '../../../context/SaldoContext'

import ContainerServices from './ContainerServices'

import FormError from '../../../utilities/FormError'
import Loading from '../../../utilities/Loading'
import Modal from '../../../utilities/Modal'

import { validationSchemaServices } from '../../../utilities/ValidationSchema'
import useHandleServices from '../../../hooks/useHandleServices'

const Servicios = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaServices)
  })

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
    fechaDefault,
    cambiarFecha
  } = useHandleServices()

  return (
    <section className='mt-8 flex flex-col'>
      <header>
        <h3 className='text-center text-lg font-semibold'>
          Servicios o gastos fijos
        </h3>
        <section className='mx-6 my-4 flex flex-col items-center'>
          <p className='text-center text-sm text-gray-600'>
            Ahorra tiempo al registrar servicios o gastos que no varían, como
            por ejemplo:
          </p>
          <p className='mt-2 text-sm font-bold text-blue-500'>
            Internet o teléfono
          </p>
        </section>
      </header>

      <section>
        {loading ? (
          <Loading />
        ) : (
          servicios.length > 0 && (
            <ContainerServices
              servicios={servicios}
              agregarServicioComoGasto={agregarServicioComoGasto}
            />
          )
        )}
      </section>

      <footer className='my-8 flex flex-col items-center gap-5'>
        {showFormNewService && (
          <form
            onSubmit={handleSubmit(onAddService)}
            className='mx-16 mb-8 flex flex-col gap-2'
          >
            <div className='flex flex-col'>
              <label className='text-sm text-gray-600'>
                Nombre del servicio:
              </label>

              <input
                className='rounded-sm border-2 p-2'
                {...register('nombre')}
                type='text'
                placeholder='Ej. Internet'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm text-gray-600'>
                Monto fijo a pagar:
              </label>

              <input
                className='rounded-sm border-2 p-2'
                {...register('monto')}
                type='number'
                placeholder='Ej. 100'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm text-gray-600'>
                Fecha límite de pago (día)
              </label>
              <input
                className='rounded-sm border-2 p-2'
                {...register('fecha')}
                defaultValue={fechaDefault}
                onChange={e => cambiarFecha(e.target.value)}
                type='number'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm text-gray-600'>Descripción:</label>

              <textarea
                {...register('descripcion')}
                className='min-h-[100px] resize-y rounded-sm border-2 p-2'
                placeholder='Ej. Internet de la casa.'
              />
            </div>

            <FormError errors={errors} />

            <button
              className={`${
                errors.nombre ||
                errors.monto ||
                errors.fecha ||
                errors.descripcion
                  ? 'cursor-not-allowed bg-red-300 opacity-60'
                  : 'cursor-pointer bg-blue-300 transition-all duration-200 hover:bg-blue-500 hover:text-blue-100'
              } rounded-sm p-2 font-bold shadow-md`}
            >
              Guardar
            </button>
          </form>
        )}

        {showFormDeleteService && (
          <section className='mx-16 flex flex-col gap-2'>
            <input
              onChange={e => setServicioABorrar(e.target.value)}
              type='text'
              placeholder='Ingrese el servicio'
              className='rounded-md border-2 border-gray-200 p-2'
            />

            {existeServicioABorrar ? (
              <Modal
                callbackButtonConfirm={() =>
                  handleDeleteService(servicioABorrar)
                }
                textButtonModal='Eliminar'
                css='flex justify-center gap-2 p-2'
                titleModal='¿Desea eliminar este servicio?'
                paragraphModal={`Está a punto de eliminar el servicio "${servicioABorrar
                  .charAt(0)
                  .toUpperCase() +
                  servicioABorrar.slice(
                    1
                  )}", esta acción no se puede deshacer. ¿Desea continuar?`}
                textButtonConfirm='Sí, eliminar'
              />
            ) : (
              ''
            )}
          </section>
        )}

        <div className='flex flex-col gap-4'>
          <button
            className='rounded-sm bg-amber-300 p-2 font-bold shadow-sm transition-all duration-150 hover:bg-amber-400'
            onClick={() => {
              setShowFormNewService(!showFormNewService)
              setShowFormDeleteService(false)
            }}
          >
            {showFormNewService ? 'Cerrar' : 'Nuevo servicio'}
          </button>

          {servicios?.length > 0 && (
            <button
              onClick={() => {
                setShowFormDeleteService(!showFormDeleteService)
                setShowFormNewService(false)
              }}
              className='text-sm text-gray-500 underline transition-all duration-200 hover:text-black'
            >
              {showFormDeleteService ? 'Cerrar' : 'Eliminar servicio'}
            </button>
          )}
        </div>
      </footer>
    </section>
  )
}

export default memo(Servicios)
