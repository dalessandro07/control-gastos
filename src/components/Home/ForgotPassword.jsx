import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

import Input from '../../utilities/Input'
import FormError from '../../utilities/FormError'

import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [isRobot, setIsRobot] = useState(false)
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const navigateTo = useNavigate()

  const onSubmit = async (user) => {
    if (isRobot) {
      try {
        await resetPassword(user.email)

        toast.success('Se ha enviado un correo para restablecer tu contraseña')
        navigateTo('/login')
      } catch (error) {
        toast.error('No se pudo enviar el correo, intente nuevamente')
      }
    } else {
      toast.error('Debes verificar que no eres un robot')
    }
  }

  return (
    <section className="flex grow flex-col justify-center gap-10">
      <h1 className="mx-auto w-max border-b-2 border-red-400 pb-1 text-center text-xl font-semibold">
        Recupera tu contraseña
      </h1>

      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col items-center">
          <p>Ingresa tu e-mail</p>
          <Input register={register} name="email" watch={watch} errors={errors} />
        </label>

        <ReCAPTCHA
          sitekey="6LdtwBwgAAAAAAiUIYfJ6spW38IUULNb-ofhXsX4"
          onChange={(value) => {
            if (value) setIsRobot(value)
          }}
        />

        <section className="flex flex-col">
          <FormError errors={errors} />

          <Link className="my-3 text-center text-sm underline" to="/register">
            Registrarme
          </Link>

          <button
            type="submit"
            className="my-4 mx-auto w-max rounded-sm border-2 border-gray-800 p-1 px-2">
            Recuperar
          </button>
        </section>
      </form>
    </section>
  )
}

export default ForgotPassword
