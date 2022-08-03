import React from 'react'
import { useForm } from 'react-hook-form'

import useRegister from './hooks/useRegister'
import CustomInput from '../utils/Input/CustomInput'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    mode: 'onChange'
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
              <CustomInput name="nombre" register={register} watch={watch} errors={errors} />
            </label>

            {errors?.nombre && (
              <article className="mt-2">
                <p className="text-xs text-red-600">* {errors.nombre.message}</p>
              </article>
            )}
          </section>

          <section className="flex w-full flex-col">
            <label className="flex w-full flex-col items-center">
              <CustomInput name="email" register={register} watch={watch} errors={errors} />
            </label>

            {errors?.email && (
              <article className="mt-2">
                <p className="text-xs text-red-600">* {errors.email.message}</p>
              </article>
            )}
          </section>

          <section className="flex w-full flex-col gap-8">
            <article className="flex flex-col items-center">
              <CustomInput name="password" register={register} watch={watch} errors={errors} />

              {errors?.password && (
                <article className="mt-2">
                  <p className="text-xs text-red-600">* {errors.password.message}</p>
                </article>
              )}
            </article>

            <article className="flex flex-col items-center">
              <CustomInput
                name="confirmPassword"
                register={register}
                watch={watch}
                errors={errors}
              />

              {errors?.confirmPassword && (
                <article className="mt-2">
                  <p className="text-xs text-red-600">* {errors.confirmPassword.message}</p>
                </article>
              )}
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
            } my-4 mx-auto w-max rounded-full p-2 px-6`}>
            {isSubmitting ? 'Registrándote...' : 'Registrarme'}
          </button>
        </section>
      </form>
    </section>
  )
}

export default Register
