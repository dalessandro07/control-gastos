import React, { useState } from 'react'
import { useColor } from '../../../context/ColorContext'
import useInputIcons from './hooks/useInputIcons'
import { Input } from '@material-tailwind/react'

const CustomInput = ({
  register,
  errors,
  name,
  type = '',
  label = '',
  icon = '',
  color = '',
  variant = ''
}) => {
  const { resumeColor } = useColor()

  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const {
    nameIcon,
    emailIcon,
    passwordIcon,
    confirmPasswordIcon,
    nameServiceIcon,
    montoServiceIcon
  } = useInputIcons(viewPassword, viewConfirmPassword, setViewPassword, setViewConfirmPassword)

  const inputSelected = {
    nombre: {
      icon: nameIcon,
      type: 'text',
      label: 'Nombre'
    },
    email: {
      icon: emailIcon,
      type: 'email',
      label: 'Correo electrónico'
    },
    password: {
      icon: passwordIcon,
      type: viewPassword ? 'text' : 'password',
      label: 'Contraseña'
    },
    confirmPassword: {
      icon: confirmPasswordIcon,
      type: viewConfirmPassword ? 'text' : 'password',
      label: 'Confirmar contraseña'
    },
    nombreServicio: {
      icon: nameServiceIcon,
      type: 'text',
      label: 'Nombre del servicio'
    },
    monto: {
      icon: montoServiceIcon,
      type: 'number',
      label: 'Monto a pagar'
    },
    fecha: {
      type: 'date',
      label: 'Fecha'
    }
  }

  return (
    <label className="flex flex-col">
      <Input
        required
        {...register(name)}
        color={color || resumeColor}
        variant={variant || 'outlined'}
        className="xs:text-lg"
        icon={icon || inputSelected[name]?.icon}
        type={type || inputSelected[name]?.type}
        label={label || inputSelected[name]?.label}
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

export default CustomInput
