import { registerSW } from 'virtual:pwa-register'
import { toast } from 'react-toastify'

registerSW({
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
  navigator.serviceWorker.register('/sw.js')
}
