import React, { useState } from 'react'

import { Input } from '@material-tailwind/react'
import useInputIcons from './hooks/useInputIcons'

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
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const { nameIcon, emailIcon, passwordIcon, confirmPasswordIcon } = useInputIcons(
    viewPassword,
    viewConfirmPassword,
    setViewPassword,
    setViewConfirmPassword
  )

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
    }
  }

  return (
    <>
      <Input
        required
        {...register(name)}
        color={color || 'amber'}
        variant={variant || 'outlined'}
        className="xs:text-lg"
        icon={inputSelected[name]?.icon || icon}
        type={inputSelected[name]?.type || type}
        label={label || inputSelected[name]?.label}
        error={errors?.[name] && true}
      />

      {errors[name] && (
        <article className="mt-2">
          <p className="text-xs text-red-600">* {errors[name].message}</p>
        </article>
      )}
    </>
  )
}

export default CustomInput
