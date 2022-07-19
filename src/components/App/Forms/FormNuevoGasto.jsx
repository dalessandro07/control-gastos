import React, { memo } from 'react'
import { useDivisas } from '../../../context/DivisasContext'

const FormNuevoGasto = ({ valueSendGasto }) => {
  const { divisaActual } = useDivisas()

  const {
    errors,
    etiqueta,
    cambiarEtiqueta,
    handleSubmit,
    onSubmit,
    register,
    button,
    isFixedService
  } = valueSendGasto

  return (
    <form
      id='form-nuevo-gasto'
      className='mx-auto mt-8 flex w-3/4 flex-col'
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className='mb-6'>
        <label className='flex items-center justify-center'>
          <p
            className={
              errors?.monto ? 'text-3xl text-red-500' : 'text-2xl text-black'
            }
          >
            {divisaActual?.divisa}
          </p>
          <input
            disabled={isFixedService}
            className={`${
              errors.monto
                ? 'border-red-500 text-red-500 placeholder:text-red-300'
                : ''
            } w-60 rounded-sm bg-gray-100 text-center text-7xl`}
            placeholder='25.50'
            type='number'
            step={0.01}
            {...register('monto')}
          />
        </label>

        {errors.monto && (
          <p className='text-sm text-red-500'>*{errors.monto.message}</p>
        )}
      </section>

      <section>
        <label className='my-2 flex items-center justify-between'>
          <p>Fecha:</p>
          <input
            className={`${
              errors.fecha ? 'border-red-500 text-red-500' : 'border-sky-600'
            } rounded-sm border-2 p-1`}
            type='date'
            {...register('fecha')}
          />
        </label>
      </section>

      <section>
        <label className='my-2 flex flex-col justify-between'>
          <p>Descripción:</p>

          <textarea
            disabled={isFixedService}
            className={`${
              errors.descripcion
                ? 'border-red-500 text-red-500 placeholder:text-red-300'
                : 'border-sky-600'
            } mt-4 max-h-60 min-h-[120px] resize-y border-2 p-2`}
            placeholder='Ingrese la descripción'
            type='text'
            {...register('descripcion')}
          />
        </label>

        {errors.descripcion && (
          <p className='text-sm text-red-500'>*{errors.descripcion.message}</p>
        )}

        <label className='mt-6 mb-1 flex items-center justify-between'>
          <p>Etiqueta:</p>

          <select
            className={`${
              errors.etiqueta ? 'border-red-500 text-red-500' : 'border-sky-600'
            } cursor-pointer rounded-sm border-b-2 bg-gray-100 p-1`}
            {...register('etiqueta')}
            onChange={e => cambiarEtiqueta(e.target.value)}
            value={etiqueta || 'otros'}
            placeholder='Ejm: Comida'
          >
            <option value='comida'>Comida</option>
            <option value='transporte'>Transporte</option>
            <option value='servicios'>Servicios</option>
            <option value='salud'>Salud</option>
            <option value='oficina'>Oficina</option>
            <option value='educacion'>Educación</option>
            <option value='ropa'>Ropa</option>
            <option value='hogar'>Hogar</option>
            <option value='diversion'>Diversión</option>
            <option value='aseo'>Útiles de Aseo</option>
            <option value='otros'>Otros</option>
          </select>
        </label>

        {errors.etiqueta && (
          <p className='text-right text-sm text-red-500'>
            *{errors.etiqueta.message}
          </p>
        )}
      </section>

      <input
        type='submit'
        className={`${
          errors.monto || errors.descripcion || errors.fecha
            ? 'cursor-not-allowed bg-gray-400 opacity-70'
            : 'bg-amber-300'
        } mt-6 flex cursor-pointer justify-center rounded-sm p-2 font-semibold`}
        value={button}
      />
    </form>
  )
}

export default memo(FormNuevoGasto)
