import React, { useState } from 'react'

import { Input } from '@material-tailwind/react'

const CustomInput = ({ register, watch, errors, name, type = '', label = '', icon = '' }) => {
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

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

  const NameInput = (
    <Input
      className="xs:text-lg"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      }
      {...register(name, values[name])}
      color="amber"
      type="text"
      label="Nombre"
      error={errors?.[name] && true}
    />
  )

  const EmailInput = (
    <Input
      className="xs:text-lg"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      }
      {...register(name, values[name])}
      color="amber"
      type="email"
      label="Correo electrónico"
      error={errors?.[name] && true}
    />
  )

  const PasswordInput = (
    <Input
      className="xs:text-lg"
      icon={
        viewPassword ? (
          <svg
            onClick={() => setViewPassword(!viewPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setViewPassword(!viewPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        )
      }
      {...register(name, values[name])}
      color="amber"
      type={viewPassword ? 'text' : 'password'}
      label="Contraseña"
      error={errors?.[name] && true}
    />
  )

  const ConfirmPasswordInput = (
    <Input
      className="xs:text-lg"
      icon={
        viewConfirmPassword ? (
          <svg
            onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        )
      }
      {...register(name, values[name])}
      color="amber"
      type={viewConfirmPassword ? 'text' : 'password'}
      label="Confirmar contraseña"
      error={errors?.[name] && true}
    />
  )

  return name === 'nombre' ? (
    NameInput
  ) : name === 'email' ? (
    EmailInput
  ) : name === 'password' ? (
    PasswordInput
  ) : name === 'confirmPassword' ? (
    ConfirmPasswordInput
  ) : (
    <Input
      className="xs:text-lg"
      {...register(name, values[name])}
      type={type}
      color="amber"
      label={label}
      icon={icon}
      error={errors?.[name] && true}
    />
  )
}

export default CustomInput
