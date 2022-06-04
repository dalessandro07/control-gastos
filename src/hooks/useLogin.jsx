import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const { login, loginWithGoogle, AuthErrorCodes, loginWithPhoneNumber, RecaptchaVerifier } =
    useAuth()

  const firebaseAuthErrors = {
    'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
    'auth/invalid-email': 'El correo electrónico no es válido.',
    'auth/weak-password': 'La contraseña es muy débil.',
    'auth/wrong-password': 'La contraseña no es correcta.',
    'auth/user-not-found': 'El usuario no existe.',
    'auth/user-disabled': 'El usuario está deshabilitado.',
    'auth/too-many-requests': 'Has hecho demasiadas peticiones, inténtalo de nuevo más tarde.'
  }

  const navigateTo = useNavigate()

  const changeLoading = (value) => setLoading(value)

  const onSubmit = async (data, e) => {
    try {
      await login(data.email, data.password)

      toast.success(`¡Bienvenido ${data.email.split('@')[0]}!`)
      navigateTo('/')

      e.target.reset()
    } catch (error) {
      const errorCode = Object.values(AuthErrorCodes).find((code) => code === error.code)

      toast.error(
        `Error: ${firebaseAuthErrors[errorCode] || errorCode}` ||
          'Se ha producido un error, inténtalo de nuevo.'
      )
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()

      navigateTo('/')
    } catch (error) {
      const errorCode = Object.values(AuthErrorCodes).find((code) => code === error.code)

      toast.error(
        `Error: ${firebaseAuthErrors[errorCode] || errorCode}` ||
          'Se ha producido un error, inténtalo de nuevo.'
      )
    }
  }

  const handlePhoneNumberLogin = async (phoneNumber, appVerifier) => {
    setLoading(true)
    try {
      loginWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        setLoading(false)
        toast.success(
          `El código de verificación fue enviado a ${
            phoneNumber.split('+51')[1]
          }, por favor ingréselo.`
        )
      })
    } catch (error) {
      const errorCode = Object.values(AuthErrorCodes).find((code) => code === error.code)

      setLoading(false)
      toast.error(
        `Error: ${firebaseAuthErrors[errorCode] || errorCode}` ||
          'Se ha producido un error, inténtalo de nuevo.'
      )
    }
  }

  return {
    onSubmit,
    handleGoogleLogin,
    handlePhoneNumberLogin,
    RecaptchaVerifier,
    firebaseAuthErrors,
    AuthErrorCodes,
    loading,
    changeLoading
  }
}

export default useLogin
