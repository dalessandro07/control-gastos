import { useAuth } from '../../../../context/AuthContext'

import { toast } from 'react-toastify'

const useUpdateUser = () => {
  const { user, updateUser } = useAuth()

  const handleUpdateUser = async data => {
    if (data?.displayName === user?.displayName) {
      toast.info('¡No se han detectado cambios!')
    } else {
      try {
        const dataToUpdate = {
          displayName: data?.displayName.trim()
        }

        await updateUser(dataToUpdate)

        toast.success('¡Datos actualizados correctamente!')
      } catch (error) {
        toast.error('¡Ha ocurrido un error!')
      }
    }
  }

  return { handleUpdateUser }
}

export default useUpdateUser
