import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase'

import { isValidPhoneNumber } from 'react-phone-number-input'
import useLogin from './useLogin'
import { toast } from 'react-toastify'

const usePhoneLogin = () => {
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
        callback: response => {
          if (response) {
            setShowInputVerification(true)
          }
        }
      },
      auth
    )
  }

  const handleSend = phoneNumber => {
    generateRecaptcha()

    const appVerifier = window.recaptchaVerifier

    try {
      if (isValidPhoneNumber(phoneNumber)) {
        handlePhoneNumberLogin(phoneNumber, appVerifier)
      }
    } catch (error) {
      const errorCode = Object.values(AuthErrorCodes).find(code => code === error.code)

      toast.error(
        `Error: ${firebaseAuthErrors[errorCode] || errorCode}` ||
          'Se ha producido un error, inténtalo de nuevo.'
      )
    }
  }

  const verifyCode = verificationCode => {
    if (verificationCode?.length === 6) {
      changeLoading(true)
      const confirmationResult = window.confirmationResult

      try {
        confirmationResult.confirm(verificationCode).then(result => {
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

  return { loading, showInputVerification, number, setNumber, verifyCode, handleSend }
}

export default usePhoneLogin
