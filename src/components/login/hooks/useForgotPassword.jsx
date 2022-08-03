import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'

const useForgotPassword = () => {
  const [isRobot, setIsRobot] = useState(false)
  const { resetPassword } = useAuth()

  const navigateTo = useNavigate()

  const onSubmit = async user => {
    if (isRobot) {
      try {
        await resetPassword(user.email)

        toast.success(
          'Se ha enviado un correo para restablecer tu contraseña, revisa en spam o correo no deseado.'
        )
        navigateTo('/login')
      } catch (error) {
        toast.error('No se pudo enviar el correo, intente nuevamente')
      }
    } else {
      toast.error('Completa el Captcha.')
    }
  }

  return { onSubmit, setIsRobot }
}

export default useForgotPassword
