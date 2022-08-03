import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import useForgotPassword from './hooks/useForgotPassword'

import CustomInput from '../utils/Input/CustomInput'

import ReCAPTCHA from 'react-google-recaptcha'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange'
  })

  const { onSubmit, setIsRobot } = useForgotPassword()

  return (
    <section className="flex grow flex-col justify-center gap-10">
      <h1 className="mx-auto w-max border-b-2 border-red-400 pb-1 text-center text-xl font-semibold">
        Restablece tu contraseña
      </h1>

      <form
        className="mx-auto flex w-3/4 flex-col items-center justify-center xsm:w-2/3"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="my-6 flex w-full flex-col items-center">
          <CustomInput
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
            register={register}
            name="email"
            type="email"
            label="Correo electrónico"
            watch={watch}
            errors={errors}
          />

          {errors?.email && (
            <article className="mt-2">
              <p className="text-xs text-red-600">* {errors.email.message}</p>
            </article>
          )}
        </label>

        <div className="my-6 mb-10">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={value => {
              if (value) setIsRobot(value)
            }}
          />
        </div>

        <section className="flex flex-col">
          <button
            type="submit"
            disabled={isSubmitting}
            className="my-4 mx-auto w-max rounded-full bg-amber-300 p-2 px-6 text-lg font-semibold shadow-sm transition-colors duration-150 hover:bg-amber-400">
            {isSubmitting ? 'Enviando...' : 'Restablecer contraseña'}
          </button>

          <Link className="my-3 text-center text-sm text-blue-600 underline" to="/register">
            Crear una nueva cuenta
          </Link>
        </section>
      </form>
    </section>
  )
}

export default ForgotPassword
