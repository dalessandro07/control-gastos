import React from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../utilities/Input'
import FormError from '../../utilities/FormError'
import useRegister from '../../hooks/useRegister'
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
        <section className="flex w-full flex-col sm:flex-row">
          <label className="flex flex-col items-center">
            <p>Correo electrónico:</p>
            <Input register={register} name="email" watch={watch} errors={errors} />
          </label>
        </section>

        <section className="flex w-full flex-col sm:flex-row">
          <label className="flex flex-col items-center">
            <p>Contraseña:</p>
            <Input register={register} name="password" watch={watch} errors={errors} />
          </label>

          <label className="flex flex-col items-center">
            <p>Confirmar contraseña:</p>
            <Input register={register} name="confirmPassword" watch={watch} errors={errors} />
          </label>
        </section>

        <section className="flex flex-col">
          <FormError errors={errors} />

          <Link className="my-3 text-center text-sm text-sky-600 underline" to="/login">
            Ya tengo una cuenta
          </Link>

          <button
            type="submit"
            className={`${
              errors.nombre || errors.email || errors.password || errors.confirmPassword
                ? 'cursor-not-allowed border-gray-200 bg-gray-300 text-gray-400'
                : 'border-gray-600'
            } my-4 mx-auto w-max rounded-sm border-2 p-1`}>
            Registrarme
          </button>
        </section>
      </form>
    </section>
  )
}

export default Register
