import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'react-toastify'

const updateSW = registerSW({
  onNeedRefresh() {
    toast.info('Actualizando, cierre y vuelva a abrir la aplicación')
  },
  onOfflineReady() {
    toast.info('Aplicación disponible')
  },
  onRegisterError() {
    toast.error('Hubo un error, refresque la página, e inténtelo de nuevo')
  }
})

updateSW()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
