import { agregarGastoDB } from '../firebase'

import { toast } from 'react-toastify'

const useImportExport = (gastos = [], obtenerGastos = () => {}, userUID) => {
  const exportarGastos = () => {
    const gastosJSON = JSON.stringify(gastos)

    const blob = new Blob([gastosJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'gastos_allexpenses_app.json'
    link.click()
  }

  const importarGastos = () => {
    if (gastos.length > 0) {
      toast.error('Por favor, elimine todos los gastos antes de importar')
    } else {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'
      input.addEventListener('change', (e) => {
        const file = e.target.files[0]

        if (!file.type.includes('json')) {
          toast.error('El archivo no es un JSON')
          return
        }

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (e) => {
          try {
            const gastosJSON = JSON.parse(e.target.result)
            obtenerGastos(gastosJSON)

            gastosJSON.forEach((gasto) => {
              agregarGastoDB(gasto, userUID)
            })
          } catch (error) {
            toast.error(error)
          }
        }
      })
      input.click()
    }
  }

  return { exportarGastos, importarGastos }
}

export default useImportExport
