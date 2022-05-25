import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const firebaseAuthErrors = {
  'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/weak-password': 'La contraseña es muy débil.',
  'auth/wrong-password': 'La contraseña no es correcta.',
  'auth/user-not-found': 'El usuario no existe.',
  'auth/user-disabled': 'El usuario está deshabilitado.',
  'auth/too-many-requests': 'Has hecho demasiadas peticiones, inténtalo de nuevo más tarde.'
}

const useLogin = () => {
  const { login, loginWithGoogle } = useAuth()

  const navigateTo = useNavigate()

  const onSubmit = async (data, e) => {
    try {
      await login(data.email, data.password)

      toast.success(`¡Bienvenido ${data.email.split('@')[0]}!`)
      navigateTo('/app')

      e.target.reset()
    } catch (error) {
      toast.error(firebaseAuthErrors[error.code] || 'Se ha producido un error, inténtalo de nuevo.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()

      navigateTo('/app')
    } catch (error) {
      console.log(error)
      toast.error(firebaseAuthErrors[error.code] || 'Se ha producido un error, inténtalo de nuevo.')
    }
  }

  return { onSubmit, handleGoogleLogin }
}

export default useLogin
