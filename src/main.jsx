import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'react-toastify'

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

updateSW()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
