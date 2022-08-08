import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaUser } from '../utils/ValidationSchema'

import useRegister from './hooks/useRegister'
import CustomInput from '../utils/Input/CustomInput'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaUser)
  })

  const { onSubmit } = useRegister()

  return (
    <section className="mx-6 mt-6 flex grow flex-col items-center justify-center gap-8">
      <h1 className="mt-6 w-4/5 pb-1 text-xl font-semibold xsm:w-2/3">Crea tu cuenta</h1>

      <form
        className="flex w-4/5 flex-col items-center xsm:w-2/3"
        onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-4 flex w-full flex-col gap-8 rounded-md py-6">
          <section className="flex w-full flex-col">
            <label className="flex w-full flex-col items-center">
              <CustomInput name="nombre" register={register} errors={errors} />
            </label>
          </section>

          <section className="flex w-full flex-col">
            <label className="flex w-full flex-col items-center">
              <CustomInput name="email" register={register} errors={errors} />
            </label>
          </section>

          <section className="flex w-full flex-col gap-8">
            <article className="flex flex-col items-center">
              <CustomInput name="password" register={register} errors={errors} />
            </article>

            <article className="flex flex-col items-center">
              <CustomInput name="confirmPassword" register={register} errors={errors} />
            </article>
          </section>
        </section>

        <section className="flex flex-col">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              errors.nombre ||
              errors.email ||
              errors.password ||
              errors.confirmPassword ||
              isSubmitting
                ? 'cursor-not-allowed border-2 border-gray-200 bg-gray-300 text-gray-400'
                : 'bg-amber-300 font-semibold shadow-sm transition-colors duration-150 hover:bg-amber-400'
            } my-4 mx-auto w-max rounded-full p-2 px-6 text-sm`}>
            {isSubmitting ? 'Registrándote...' : 'Registrarme'}
          </button>
        </section>
      </form>
    </section>
  )
}

export default Register
