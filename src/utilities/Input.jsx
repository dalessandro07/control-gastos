import React from 'react'

const Input = ({ register, name, watch, errors }) => {
  const values = {
    nombre: {
      type: 'text',
      placeholder: 'Nombre y Apellido',
      minLength: {
        value: 3,
        message: 'El nombre debe tener al menos 3 caracteres'
      },
      maxLength: {
        value: 32,
        message: 'El nombre debe tener como máximo 32 caracteres'
      },
      pattern: {
        value: /^[a-z A-Z]+$/,
        message: 'El nombre solo puede contener letras'
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
      },
      validate: (value) => {
        if (value !== watch('confirmPassword')) {
          return 'Las contraseñas no coinciden'
        }
      }
    },
    confirmPassword: {
      type: 'password',
      placeholder: 'Confirmar contraseña',
      minLength: {
        value: 8,
        message: 'La contraseña debe tener al menos 8 caracteres'
      },
      maxLength: {
        value: 32,
        message: 'La contraseña debe tener como máximo 32 caracteres'
      },
      validate: {
        value: (val) => {
          if (val !== watch('password')) {
            return 'Las contraseñas no coinciden'
          }
        }
      }
    }
  }

  return (
    <input
      className={`${
        errors[name] ? 'border-red-500 text-red-500' : 'border-gray-600'
      } m-4 rounded-sm border-b-2 p-2`}
      type={values[name].type}
      placeholder={values[name].placeholder}
      {...register(name, {
        required: `El campo ${values[name].placeholder} es requerido`,
        minLength: {
          value: values[name].minLength?.value,
          message: values[name].minLength?.message
        },
        maxLength: {
          value: values[name].maxLength?.value,
          message: values[name].maxLength?.message
        },
        pattern: {
          value: values[name].pattern?.value,
          message: values[name].pattern?.message
        },
        validate: values[name].validate?.value
      })}
    />
  )
}

export default Input
