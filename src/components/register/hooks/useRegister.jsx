import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const firebaseAuthErrors = {
  'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/weak-password': 'La contraseña es muy débil.',
  'auth/wrong-password': 'La contraseña no es correcta.'
}

const useRegister = () => {
  const { register, updateUser } = useAuth()
  const navigateTo = useNavigate()

  const onSubmit = async (data, e) => {
    const capturedData = {
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim()
    }

    try {
      await register(capturedData.email, capturedData.password)

      await updateUser({
        displayName: capturedData?.nombre
      })

      navigateTo('/')
      toast.success(`¡Bienvenido ${capturedData?.nombre}!`)

      e.target.reset()
    } catch (error) {
      toast.error(firebaseAuthErrors[error.code])
    }
  }

  return { onSubmit }
}

export default useRegister
