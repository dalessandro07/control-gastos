import { agregarGastoDB } from '../firebase'

import { toast } from 'react-toastify'

const useImportExport = (gastos = [], obtenerGastos = () => {}, userUID) => {
  const exportarGastos = () => {
    if (gastos.length === 0) {
      toast.error('No hay gastos para exportar')
    } else {
      const gastosJSON = JSON.stringify(gastos)

      const blob = new Blob([gastosJSON], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'gastos_allexpenses_app.json'
      link.click()
    }
  }

  const importarGastos = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.addEventListener('change', (e) => {
      const file = e.target.files[0]

      if (!file.type.includes('json')) {
        toast.error('¡El archivo no es válido, debe ser un archivo .json!')
        return
      }

      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (e) => {
        try {
          const gastosJSON = JSON.parse(e.target.result)

          const duplicados = gastosJSON.filter((gasto) => {
            return gastos.some(
              (gastoDB) =>
                gasto.id === gastoDB.id &&
                gasto.descripcion === gastoDB.descripcion &&
                gasto.categoria === gastoDB.categoria &&
                gasto.monto === gastoDB.monto &&
                gasto.fecha === gastoDB.fecha
            )
          })

          const gastosAgregar = gastosJSON.filter((gasto) => {
            return !duplicados.some(
              (dup) =>
                gasto.id === dup.id &&
                gasto.descripcion === dup.descripcion &&
                gasto.categoria === dup.categoria &&
                gasto.monto === dup.monto &&
                gasto.fecha === dup.fecha
            )
          })

          if (gastosAgregar.length === 0) {
            toast.error('Estás intentando importar gastos duplicados.')
            return
          } else if (duplicados.length > 0) {
            toast.info('Se encontraron gastos duplicados, no te preocupes se omitirán.')
          }

          obtenerGastos([...gastosAgregar, ...gastos])

          gastosAgregar.forEach((gasto) => {
            agregarGastoDB(gasto, userUID)
          })

          toast.success('¡Gastos importados correctamente!')
        } catch (error) {
          toast.error(error)
        }
      }
    })
    input.click()
  }

  return { exportarGastos, importarGastos }
}

export default useImportExport
