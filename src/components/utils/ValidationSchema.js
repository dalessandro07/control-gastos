import moment from 'moment'
import * as yup from 'yup'

const validationSchemaServices = yup.object().shape({
  nombreServicio: yup
    .string()
    .required('El nombre es requerido.')
    .max(20, 'El nombre no puede tener más de 20 caracteres.')
    .min(3, 'El nombre debe tener más de 3 caracteres.')
    .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ, .-]+$/, 'El nombre sólo puede contener letras y números'),
  descripcion: yup
    .string()
    .required('La descripción es requerida.')
    .max(250, 'La descripción no puede tener más de 250 caracteres.')
    .min(3, 'La descripción debe tener más de 3 caracteres.')
    .matches(
      /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ, .-]+$/,
      'La descripción sólo puede contener letras y números'
    ),
  monto: yup
    .number()
    .typeError('El monto debe ser un número.')
    .required('El monto es requerido.')
    .max(100000, 'El monto no puede ser mayor a 100,000.')
    .min(0.1, 'El monto debe ser mayor a 0,10.'),
  fecha: yup
    .date()
    .typeError('La fecha debe ser una fecha válida.')
    .required('La fecha es requerida.')
})

const validationSchemaGasto = yup.object().shape({
  descripcion: yup
    .string()
    .required('La descripción es requerida.')
    .max(250, 'La descripción no puede tener más de 250 caracteres.')
    .min(3, 'La descripción debe tener más de 3 caracteres.')
    .matches(
      /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ, .-]+$/,
      'La descripción sólo puede contener letras y números'
    ),
  monto: yup
    .number()
    .typeError('El monto debe ser un número.')
    .required('El monto es requerido.')
    .max(100000, 'El monto no puede ser mayor a 100,000.')
    .min(0.1, 'El monto debe ser mayor a 0,10.'),
  fecha: yup
    .date()
    .typeError('No se ingresó una fecha válida.')
    .required('La fecha de vencimiento es requerida.')
    .default(moment().format('YYYY-MM-DD')),
  etiqueta: yup.string().required('La etiqueta es requerida.')
})

const validationSchemaUser = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(32, 'El nombre debe tener como máximo 32 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s ]+$/, 'El nombre solo puede contener letras'),
  email: yup.string().required('El email es requerido').email('El email no es válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(32, 'La contraseña debe tener como máximo 32 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial'
    ),
  confirmPassword: yup
    .string()
    .required('La confirmación de la contraseña es requerida')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
})

const validationSchemaName = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(32, 'El nombre debe tener como máximo 32 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s ]+$/, 'El nombre solo puede contener letras')
})

const validationSchemaEmail = yup.object().shape({
  email: yup.string().required('El email es requerido').email('El email no es válido')
})

const validationSchemaEmailLogin = yup.object().shape({
  email: yup.string().required('El email es requerido').email('El email no es válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(32, 'La contraseña debe tener como máximo 32 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial'
    )
})

const validationSchemaPassword = yup.object().shape({
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(32, 'La contraseña debe tener como máximo 32 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial'
    )
})

export {
  validationSchemaServices,
  validationSchemaGasto,
  validationSchemaUser,
  validationSchemaName,
  validationSchemaEmail,
  validationSchemaEmailLogin,
  validationSchemaPassword
}
