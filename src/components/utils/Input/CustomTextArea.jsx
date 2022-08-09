import React from 'react'
import { useColor } from '../../../context/ColorContext'

import { Textarea } from '@material-tailwind/react'

const CustomTextarea = ({ register, errors, name, label = '', color = '', variant = '' }) => {
  const { resumeColor } = useColor()

  const textareaSelected = {
    descripcion: {
      type: 'text',
      label: 'Descripción'
    }
  }

  return (
    <label className="flex flex-col">
      <Textarea
        size="lg"
        required
        {...register(name)}
        color={color || resumeColor}
        variant={variant || 'outlined'}
        className="xs:text-lg"
        label={label || textareaSelected[name]?.label}
        error={errors?.[name] && true}
      />

      {errors[name] && (
        <article className="mt-2">
          <p className="text-xs text-red-600">* {errors[name].message}</p>
        </article>
      )}
    </label>
  )
}

export default CustomTextarea
