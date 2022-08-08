import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaEmail } from '../utils/ValidationSchema'

import useForgotPassword from './hooks/useForgotPassword'
import CustomInput from '../utils/Input/CustomInput'

import ReCAPTCHA from 'react-google-recaptcha'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaEmail)
  })

  const { onSubmit, setIsRobot } = useForgotPassword()

  return (
    <section className="flex grow flex-col justify-center gap-10">
      <h1 className="pb-1 text-center text-2xl font-semibold leading-9">
        Reestablece tu contraseña.
      </h1>

      <form
        className="mx-auto flex w-3/4 flex-col items-center justify-center xsm:w-2/3"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="my-6 flex w-full flex-col items-center">
          <CustomInput name="email" register={register} errors={errors} />
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
