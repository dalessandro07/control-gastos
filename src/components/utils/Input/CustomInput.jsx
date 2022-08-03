import React, { useState } from 'react'

import { Input } from '@material-tailwind/react'
import useInput from './hooks/useInput'

const CustomInput = ({ register, watch, errors, name, type = '', label = '', icon = '' }) => {
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const { nameIcon, emailIcon, passwordIcon, confirmPasswordIcon } = useInput(
    viewPassword,
    viewConfirmPassword,
    setViewPassword,
    setViewConfirmPassword
  )

  const values = {
    nombre: {
      type: 'text',
      minLength: {
        value: 3,
        message: 'El nombre debe tener al menos 3 caracteres.'
      },
      maxLength: {
        value: 32,
        message: 'El nombre debe tener como máximo 32 caracteres.'
      },
      pattern: {
        value: /^[a-z A-Z]+$/,
        message: 'El nombre solo puede contener letras.'
      }
    },
    email: {
      type: 'email',
      placeholder: 'Email',
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'El email no es válido, verifíquelo.'
      }
    },
    password: {
      type: 'password',
      placeholder: 'Contraseña',
      minLength: {
        value: 8,
        message: 'La contraseña debe tener al menos 8 caracteres'
      },
      maxLength: {
        value: 32,
        message: 'La contraseña debe tener como máximo 32 caracteres'
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
        message:
          'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'
      }
    },
    confirmPassword: {
      type: 'password',
      placeholder: 'Confirmar contraseña',
      validate: {
        value: val => {
          if (val !== watch('password')) return 'Las contraseñas no coinciden'
        }
      }
    }
  }

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
    <Input
      {...register(name, values[name])}
      color="amber"
      className="xs:text-lg"
      icon={inputSelected[name]?.icon || icon}
      type={inputSelected[name]?.type || type}
      label={inputSelected[name]?.label || label}
      error={errors?.[name] && true}
    />
  )
}

export default CustomInput
