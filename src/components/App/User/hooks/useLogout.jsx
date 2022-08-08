import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

import { toast } from 'react-toastify'

const useLogout = () => {
  const { logout } = useAuth()

  const navigateTo = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.info('¡Sesión cerrada, hasta luego!')
    navigateTo('/login')
  }

  return { handleLogout }
}

export default useLogout
