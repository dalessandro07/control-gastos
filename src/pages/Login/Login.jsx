import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Input from '../../utilities/Input'
import FormError from '../../utilities/FormError'
import useLogin from './hooks/useLogin'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const navigateTo = useNavigate()

  const { onSubmit, handleGoogleLogin } = useLogin()

  const [showEmailLogin, setShowEmailLogin] = useState(false)

  return (
    <section className='mt-6 flex flex-col items-center justify-center'>
      <h1 className='mx-auto my-8 w-max border-b-2 border-amber-400 pb-1 text-center text-xl font-semibold'>
        ¡Ingresa ya!
      </h1>

      {!showEmailLogin && (
        <div className='flex flex-col mb-16'>
          <button
            onClick={handleGoogleLogin}
            className='m-auto my-6 flex w-max items-center rounded-sm border-2 border-amber-400 p-2'
          >
            <svg
              className='mr-4'
              width={19}
              height={20}
              viewBox='0 0 19 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
                fill='#4285F4'
              />
              <path
                d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
                fill='#34A853'
              />
              <path
                d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
                fill='#FBBC05'
              />
              <path
                d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
                fill='#EB4335'
              />
            </svg>
            <p>Ingresar con google</p>
          </button>

          <button
            onClick={() => {
              navigateTo('/phone-number')
            }}
            className='m-auto my-6 flex w-max items-center rounded-sm border-2 border-amber-400 p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-4 h-5 w-5 text-indigo-700'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
            </svg>
            <p>Ingresar con teléfono</p>
          </button>

          <button
            onClick={() => setShowEmailLogin(!showEmailLogin)}
            className='m-auto my-6 flex w-max items-center rounded-sm border-2 border-amber-400 p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-4 h-6 w-6 text-gray-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
            <p>Ingresar con correo</p>
          </button>
        </div>
      )}

      {showEmailLogin && (
        <form
          className='flex flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <button onClick={() => setShowEmailLogin(!showEmailLogin)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
              />
            </svg>
          </button>

          <section className='mb-4 rounded-md py-5'>
            <label className='flex flex-col items-center my-6'>
              <p className='font-bold'>Correo electrónico:</p>
              <Input
                register={register}
                name='email'
                watch={watch}
                errors={errors}
              />
            </label>

            <label className='flex flex-col items-center mt-6'>
              <p className='font-bold'>Contraseña:</p>
              <Input
                register={register}
                name='password'
                watch={watch}
                errors={errors}
              />
            </label>
          </section>

          <section className='flex flex-col'>
            <FormError errors={errors} />

            <section className='flex flex-col sm:flex-row sm:gap-8'>
              <button
                type='submit'
                className='my-4 mx-auto text-lg font-semibold w-max rounded-sm bg-amber-300 p-2 shadow-sm transition-colors duration-150 hover:bg-amber-400'
              >
                Ingresar
              </button>

              <div className='mt-6 mb-10 flex gap-5'>
                <Link
                  className='my-3 text-center text-sm text-blue-600 underline'
                  to='/register'
                >
                  No tengo una cuenta
                </Link>

                <Link
                  className='my-3 text-center text-sm text-blue-600 underline'
                  to='/forgot-password'
                >
                  Olvidé mi contraseña
                </Link>
              </div>
            </section>
          </section>
        </form>
      )}
    </section>
  )
}

export default Login
