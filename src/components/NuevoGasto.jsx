import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SaldoContext } from '../context/SaldoContext'
import { useForm } from 'react-hook-form'
import moment from 'moment'

const NuevoGasto = () => {
  const { agregarGasto } = useContext(SaldoContext)

  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const onSubmit = (data) => {
    agregarGasto(data)
    navigateTo('/gastos')
  }

  return (
    <section className="my-8 rounded-sm pb-4">
      <h2 className="pt-4 text-center text-lg font-semibold">Nuevo gasto</h2>

      <form className="mx-auto mt-6 flex w-3/4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-6">
          <label className="flex items-center justify-center">
            <p className={errors?.monto ? 'text-3xl text-red-500' : 'text-3xl text-black'}>S/</p>
            <input
              className={`${
                errors.monto ? 'border-red-500 text-red-500' : ''
              } w-44 rounded-sm text-center text-5xl`}
              placeholder="25.5"
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
                  value: 100000,
                  message: 'El monto debe ser menor o igual a 100,000'
                },
                valueAsNumber: true
              })}
            />
          </label>

          {errors.monto && <p className="text-sm text-red-500">{errors.monto.message}</p>}
        </section>

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

        <section>
          <label className="my-2 flex flex-col justify-between">
            <p>Descripción:</p>

            <textarea
              className={`${
                errors.descripcion ? 'border-red-500 text-red-500' : 'border-sky-600'
              } mt-4 max-h-48 min-h-[120px] resize-y border-2 p-2`}
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
                }
              })}
            />
          </label>

          {errors.descripcion && (
            <p className="text-sm text-red-500">{errors.descripcion.message}</p>
          )}
        </section>

        <input
          className={`${
            errors.monto || errors.descripcion || errors.fecha
              ? 'cursor-not-allowed bg-gray-400 opacity-70'
              : 'bg-amber-300'
          } mt-6 flex cursor-pointer justify-center rounded-sm p-2 font-semibold`}
          type="submit"
          value="Agregar"
        />
      </form>
    </section>
  )
}

export default NuevoGasto
