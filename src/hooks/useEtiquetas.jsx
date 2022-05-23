import { useState } from 'react'

const useEtiquetas = (gastos = []) => {
  const [selectedTag, setSelectedTag] = useState({})

  const etiquetas = gastos.reduce(
    (acc, gasto) => (acc.includes(gasto.etiqueta) ? acc : [...acc, gasto.etiqueta]),
    []
  )

  const etiquetasCapitalized = etiquetas.map(
    (etiqueta) => etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)
  )

  const changeSelectTag = (tag) => {
    setSelectedTag(tag)
  }

  return { etiquetas, etiquetasCapitalized, selectedTag, changeSelectTag }
}

export default useEtiquetas
