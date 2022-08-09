import React from 'react'

import { useColor } from '../../../../context/ColorContext'

import useChangeDivisa from './hooks/useChangeDivisa'
import useDivisaSelected from './hooks/useDivisaSelected'

import { Button, Select, Option } from '@material-tailwind/react'

const SelectDivisa = () => {
  const { resumeColor } = useColor()
  const { divisas } = useChangeDivisa()
  const { divisaSelected, handleChangeDivisa, saveDivisa } = useDivisaSelected()

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
        Cambiar
      </Button>
    </article>
  )
}

export default SelectDivisa
