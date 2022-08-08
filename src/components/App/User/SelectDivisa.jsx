import React, { useState } from 'react'

import useChangeDivisa from './hooks/useChangeDivisa'
import { Button, Select, Option } from '@material-tailwind/react'
import { useColor } from '../../../context/ColorContext'

const SelectDivisa = () => {
  const { resumeColor } = useColor()
  const { divisas, saveDivisaDB, divisaActual } = useChangeDivisa()
  const [divisaSelected, setDivisaSelected] = useState(divisaActual?.divisa || '')

  const handleChangeDivisa = val => setDivisaSelected(val)
  const saveDivisa = () => saveDivisaDB(divisaSelected)

  return (
    <article className="my-5 flex flex-col items-center justify-between gap-8">
      <Select onChange={handleChangeDivisa} value={divisaSelected} label="Escoje una moneda">
        {Object.keys(divisas).map(key => (
          <Option key={key} value={key}>
            {key} {divisas[key]}
          </Option>
        ))}
      </Select>

      <Button onClick={saveDivisa} size="sm" color={resumeColor} variant="gradient">
        Guardar
      </Button>
    </article>
  )
}

export default SelectDivisa
