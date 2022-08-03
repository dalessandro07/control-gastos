import React from 'react'
import ReactDOM from 'react-dom/client'

import useServiceWorker from './hooks/useServiceWorker'

import App from './App'
import './index.css'

const { updateSW } = useServiceWorker()
updateSW()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
