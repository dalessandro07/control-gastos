import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../context/AuthContext'

import { toast } from 'react-toastify'

const useUpdateUser = () => {
  const { user, updateUser } = useAuth()
  const navigateTo = useNavigate()

  const handleUpdateUser = async data => {
    if (data?.nombre === user?.displayName) {
      toast.info('¡No se han detectado cambios!')
    } else {
      if (data.nombre && data.nombre.length > 3) {
        try {
          const dataToUpdate = {
            displayName: data.nombre.trim()
          }

          await updateUser(dataToUpdate)
          toast.success('¡Datos actualizados correctamente!')
          navigateTo('/')
        } catch (error) {
          toast.error('¡Ha ocurrido un error!')
        }
      }
    }
  }

  return { handleUpdateUser }
}

export default useUpdateUser
