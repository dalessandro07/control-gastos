import React from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../utilities/Input'
import FormError from '../../utilities/FormError'
import useRegister from './hooks/useRegister'
import { Link } from 'react-router-dom'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    mode: 'onChange'
  })

  const { onSubmit } = useRegister()

  return (
    <section className="mt-6 flex flex-col gap-8">
      <h1 className="mx-auto mt-6 w-max border-b-2 border-amber-400 pb-1 text-center text-xl font-semibold">
        ¡Regístrate gratis!
      </h1>

      <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-4 rounded-md bg-blue-300 py-6 shadow-md">
          <section className="flex w-full flex-col sm:flex-row">
            <label className="flex flex-col items-center">
              <p className="font-bold">Correo electrónico:</p>
              <Input register={register} name="email" watch={watch} errors={errors} />
            </label>
          </section>

          <section className="flex w-full flex-col sm:flex-row">
            <label className="flex flex-col items-center">
              <p className="font-bold">Contraseña:</p>
              <Input register={register} name="password" watch={watch} errors={errors} />
            </label>

            <label className="flex flex-col items-center">
              <p className="font-bold">Confirmar contraseña:</p>
              <Input register={register} name="confirmPassword" watch={watch} errors={errors} />
            </label>
          </section>
        </section>

        <section className="flex flex-col">
          <FormError errors={errors} />

          <Link className="my-3 text-center text-blue-600 underline" to="/login">
            Ya tengo una cuenta
          </Link>

          <button
            type="submit"
            className={`${
              errors.nombre || errors.email || errors.password || errors.confirmPassword
                ? 'cursor-not-allowed border-2 border-gray-200 bg-gray-300 text-gray-400'
                : 'bg-amber-300 shadow-sm transition-colors duration-150 hover:bg-amber-400'
            } my-4 mx-auto w-max rounded-sm p-2`}>
            Registrarme
          </button>
        </section>
      </form>
    </section>
  )
}

export default Register
