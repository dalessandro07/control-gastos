import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const firebaseAuthErrors = {
  'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/weak-password': 'La contraseña es muy débil.',
  'auth/wrong-password': 'La contraseña no es correcta.'
}

const useRegister = () => {
  const { register } = useAuth()

  const navigateTo = useNavigate()

  const onSubmit = async (data, e) => {
    try {
      await register(data.email, data.password)

      toast.success('Te has registrado correctamente.')
      navigateTo('/login')

      e.target.reset()
    } catch (error) {
      toast.error(firebaseAuthErrors[error.code])
    }
  }

  return { onSubmit }
}

export default useRegister
