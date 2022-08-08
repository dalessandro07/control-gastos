import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

import { toast } from 'react-toastify'

const useDeleteAccount = () => {
  const navigateTo = useNavigate()

  const { deleteAccount } = useAuth()

  const handleDeleteAccount = async () => {
    await deleteAccount()
    toast.info('¡Cuenta eliminada!')
    navigateTo('/login')
  }

  return { handleDeleteAccount }
}

export default useDeleteAccount
