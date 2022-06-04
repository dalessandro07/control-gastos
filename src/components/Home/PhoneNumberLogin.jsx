import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import useLogin from '../../hooks/useLogin'
import Loading from '../../utilities/Loading'

const countryCode = {
  AR: '+54',
  BR: '+55',
  CL: '+56',
  CO: '+57',
  CR: '+58',
  EC: '+593',
  SV: '+503',
  PE: '+51'
}

const PhoneNumberLogin = () => {
  const {
    handlePhoneNumberLogin,
    RecaptchaVerifier,
    AuthErrorCodes,
    firebaseAuthErrors,
    loading,
    changeLoading
  } = useLogin()

  const [number, setNumber] = useState('')
  const [showInputVerification, setShowInputVerification] = useState(false)

  const navigateTo = useNavigate()

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'verify-button',
      {
        size: 'invisible',
        callback: (response) => {
          if (response) {
            setShowInputVerification(true)
          }
        }
      },
      auth
    )
  }

  const handleSend = (phoneNumber) => {
    const numberToSend = `${countryCode.PE}${phoneNumber}`
    generateRecaptcha()

    const appVerifier = window.recaptchaVerifier

    try {
      handlePhoneNumberLogin(numberToSend, appVerifier)
    } catch (error) {
      const errorCode = Object.values(AuthErrorCodes).find((code) => code === error.code)

      toast.error(
        `Error: ${firebaseAuthErrors[errorCode] || errorCode}` ||
          'Se ha producido un error, inténtalo de nuevo.'
      )
    }
  }

  const verifyCode = (verificationCode) => {
    if (verificationCode.length === 6) {
      changeLoading(true)
      const confirmationResult = window.confirmationResult

      try {
        confirmationResult.confirm(verificationCode).then((result) => {
          if (result.user) {
            changeLoading(false)
            toast.success('Registro exitoso ¡bienvenido!')
            navigateTo('/')
          }
        })
      } catch (error) {
        changeLoading(false)
        toast.error('Ocurrió un error, inténtalo de nuevo.')
      }
    }
  }

  return (
    <section className="m-8 flex flex-col items-center justify-center">
      <h1 className="mx-auto mb-8 w-max border-b-2 border-amber-400 pb-1 text-center text-xl font-semibold">
        ¡Ingresa ya!
      </h1>

      <p className="my-4 text-center">
        Enviaremos un código de verificación a tu número de teléfono.
      </p>

      {loading ? (
        <Loading />
      ) : (
        <>
          {!showInputVerification && (
            <input
              onChange={(e) => setNumber(e.target.value)}
              className="my-6 mt-8 w-full border-b-2 border-blue-400 text-center text-2xl font-bold placeholder:text-base placeholder:font-normal"
              type="number"
              placeholder="Ingrese el nro de teléfono"
            />
          )}

          {showInputVerification && (
            <input
              onChange={(e) => verifyCode(e.target.value)}
              className="my-6 mt-8 w-full border-b-2 border-amber-400 text-center text-2xl font-bold placeholder:text-base placeholder:font-normal"
              type="number"
              placeholder="Ingrese el código de verificación"
            />
          )}
        </>
      )}

      {!showInputVerification && (
        <button
          id="verify-button"
          onClick={
            number.length === 9
              ? () => handleSend(number)
              : () => toast.error('Ingrese un número telefónico válido')
          }
          className="my-8 cursor-pointer bg-amber-300 p-2 font-bold hover:bg-amber-400"
          type="submit">
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      )}
    </section>
  )
}

export default PhoneNumberLogin
