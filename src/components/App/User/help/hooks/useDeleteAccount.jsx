import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../context/AuthContext'

import { parsePhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-toastify'

const useDeleteAccount = () => {
  const { user, deleteAccount } = useAuth()
  const navigateTo = useNavigate()

  const handleDeleteAccount = async () => {
    await deleteAccount()
    toast.info('La cuenta fue eliminada.')
    navigateTo('/login')
  }

  const loginProvider = user?.email ? 'email' : 'number'

  const [isValidCredential, setIsValidCredential] = useState(true)

  const onSubmit = async data => {
    const match = user?.email || parsePhoneNumber(user?.phoneNumber)?.nationalNumber

    if (match) {
      const { email, number } = data
      const credential = email || number
      const isValid = match === credential

      setIsValidCredential(isValid)

      if (isValid) {
        await handleDeleteAccount()
      }
    }
  }

  return { loginProvider, onSubmit, isValidCredential }
}

export default useDeleteAccount
