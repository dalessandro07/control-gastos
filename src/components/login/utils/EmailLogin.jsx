import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

import CustomInput from '../../utils/Input/CustomInput'
import useLogin from '../hooks/useLogin'

const EmailLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const { onSubmit } = useLogin()

  const [viewPassword, setViewPassword] = useState(false)

  return (
    <form
      className="flex w-3/4 flex-col items-center justify-center xsm:w-2/3"
      onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-4 flex flex-col rounded-md py-5">
        <label className="my-6 flex flex-col items-center">
          <CustomInput
            register={register}
            name="email"
            type="email"
            label="Correo electrónico"
            watch={watch}
            errors={errors}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />

          {errors?.email && (
            <article className="mt-2">
              <p className="text-xs text-red-600">* {errors.email.message}</p>
            </article>
          )}
        </label>

        <label className="mt-6 flex flex-col items-center">
          <CustomInput
            register={register}
            name="password"
            type={viewPassword ? 'text' : 'password'}
            label="Contraseña"
            watch={watch}
            errors={errors}
            icon={
              viewPassword ? (
                <svg
                  onClick={() => setViewPassword(!viewPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setViewPassword(!viewPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )
            }
          />

          {errors?.password && (
            <article className="mt-2">
              <p className="text-xs text-red-600">* {errors.password.message}</p>
            </article>
          )}
        </label>
      </section>

      <section className="flex flex-col">
        <section className="flex flex-col sm:flex-row sm:gap-8">
          <button
            type="submit"
            className="my-4 mx-auto w-max rounded-full bg-amber-300 p-2 px-6 text-lg font-semibold shadow-sm transition-colors duration-150 hover:bg-amber-400">
            Ingresar
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
