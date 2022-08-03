import { registerSW } from 'virtual:pwa-register'
import { toast } from 'react-toastify'

const useServiceWorker = () => {
  const updateSW = registerSW({
    onNeedRefresh() {
      toast.info('Actualizando a una nueva versión, reinicie la aplicación')
    },
    onOfflineReady() {
      toast.success('Aplicación disponible')
    },
    onRegisterError() {
      toast.error('Hubo un error, refresque la página, e inténtelo de nuevo')
    }
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
  }

  return {
    updateSW
  }
}

export default useServiceWorker
