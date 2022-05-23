import React, { useEffect } from 'react'
import moment from 'moment'

import usePrepGasto from '../hooks/usePrepGasto'
import useEditGasto from '../hooks/useEditGasto'
import useSeo from '../hooks/useSeo'

const NuevoGasto = ({ mode = 'new' }) => {
  const { errors, etiqueta, cambiarEtiqueta, handleSubmit, onSubmit, register, setValueToForm } =
    usePrepGasto()

  const { title, button, gasto } = useEditGasto(mode)

  useSeo({
    title: `${title} gasto`,
    description: `Formulario para ${title !== 'Editar' ? 'agregar un' : 'editar un'} gasto`
  })

  useEffect(() => {
    setValueToForm(gasto, mode)
  }, [mode])

  return (
    <section className="my-8 rounded-sm pb-4">
      <h2 className="pt-4 text-center text-lg font-semibold">{title} gasto</h2>

      <form className="mx-auto mt-6 flex w-3/4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-6">
          <label className="flex items-center justify-center">
            <p className={errors?.monto ? 'text-3xl text-red-500' : 'text-2xl text-black'}>S/</p>
            <input
              className={`${
                errors.monto ? 'border-red-500 text-red-500 placeholder:text-red-300' : ''
              } w-60 rounded-sm bg-gray-100 text-center text-6xl`}
              placeholder="25.50"
              type="number"
              step={0.1}
              {...register('monto', {
                required: {
                  value: true,
                  message: 'El monto es requerido'
                },
                min: {
                  value: 1,
                  message: 'El monto debe ser mayor o igual a 1'
                },
                max: {
                  value: 10000,
                  message: 'El monto debe ser menor o igual a 10,000'
                },
                valueAsNumber: true
              })}
            />
          </label>

          {errors.monto && <p className="text-sm text-red-500">*{errors.monto.message}</p>}
        </section>

        <section>
          <label className="my-2 flex items-center justify-between">
            <p>Fecha:</p>
            <input
              className={`${
                errors.fecha ? 'border-red-500 text-red-500' : 'border-sky-600'
              } rounded-sm border-2 p-1`}
              type="date"
              {...register('fecha', {
                required: {
                  value: true,
                  message: 'La fecha es obligatoria'
                },
                value: moment().format('YYYY-MM-DD')
              })}
            />
          </label>
        </section>

        <section>
          <label className="my-2 flex flex-col justify-between">
            <p>Descripción:</p>

            <textarea
              className={`${
                errors.descripcion
                  ? 'border-red-500 text-red-500 placeholder:text-red-300'
                  : 'border-sky-600'
              } mt-4 max-h-60 min-h-[120px] resize-y border-2 p-2`}
              placeholder="Ingrese la descripción"
              type="text"
              {...register('descripcion', {
                required: {
                  value: true,
                  message: 'La descripción es requerida'
                },
                minLength: {
                  value: 3,
                  message: 'La descripción debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 250,
                  message: 'La descripción debe tener máximo 250 caracteres'
                },
                pattern: {
                  value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ, .-]+$/,
                  message: 'La descripción debe contener solo letras y números'
                }
              })}
            />
          </label>

          {errors.descripcion && (
            <p className="text-sm text-red-500">*{errors.descripcion.message}</p>
          )}

          <label className="mt-6 mb-1 flex items-center justify-between">
            <p>Etiqueta:</p>

            <select
              className={`${
                errors.etiqueta ? 'border-red-500 text-red-500' : 'border-sky-600'
              } cursor-pointer rounded-sm border-b-2 bg-gray-100 p-1`}
              {...register('etiqueta', {
                required: {
                  value: true,
                  message: 'La etiqueta es obligatoria'
                }
              })}
              onChange={(e) => cambiarEtiqueta(e.target.value)}
              value={etiqueta || 'otros'}
              placeholder="Ejm: Comida">
              <option value="comida">Comida</option>
              <option value="transporte">Transporte</option>
              <option value="servicios">Servicios</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educación</option>
              <option value="ropa">Ropa</option>
              <option value="hogar">Hogar</option>
              <option value="diversion">Diversión</option>
              <option value="aseo">Útiles de Aseo</option>
              <option value="otros">Otros</option>
            </select>
          </label>

          {errors.etiqueta && (
            <p className="text-right text-sm text-red-500">*{errors.etiqueta.message}</p>
          )}
        </section>

        <input
          className={`${
            errors.monto || errors.descripcion || errors.fecha
              ? 'cursor-not-allowed bg-gray-400 opacity-70'
              : 'bg-amber-300'
          } mt-6 flex cursor-pointer justify-center rounded-sm p-2 font-semibold`}
          type="submit"
          value={button}
        />
      </form>
    </section>
  )
}

export default NuevoGasto
