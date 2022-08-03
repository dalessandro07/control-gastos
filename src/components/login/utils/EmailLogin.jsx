import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import CustomInput from '../../utils/Input/CustomInput'
import useLogin from '../hooks/useLogin'

const EmailLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange'
  })

  const { onSubmit } = useLogin()

  return (
    <form
      className="flex w-3/4 flex-col items-center justify-center xsm:w-2/3"
      onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-4 flex flex-col rounded-md py-5">
        <label className="my-6 flex flex-col items-center">
          <CustomInput register={register} name="email" watch={watch} errors={errors} />

          {errors?.email && (
            <article className="mt-2">
              <p className="text-xs text-red-600">* {errors.email.message}</p>
            </article>
          )}
        </label>

        <label className="mt-6 flex flex-col items-center">
          <CustomInput register={register} name="password" watch={watch} errors={errors} />

          {errors?.password && (
            <article className="mt-2">
              <p className="text-xs text-red-600">* {errors.password.message}</p>
            </article>
          )}
        </label>
      </section>

      <section className="flex flex-col">
        <section className="flex flex-col sm:gap-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="my-4 mx-auto w-max rounded-full bg-amber-300 p-2 px-6 font-semibold shadow-sm transition-colors duration-150 hover:bg-amber-400">
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <div className="mt-5 mb-10 flex flex-col">
            <Link
              className="my-3 text-center text-sm text-blue-600 underline"
              to="/forgot-password">
              Olvidé mi contraseña
            </Link>
          </div>
        </section>
      </section>
    </form>
  )
}

export default EmailLogin
