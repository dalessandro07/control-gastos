import moment from 'moment'
import * as yup from 'yup'

const validationSchemaServices = yup.object().shape({
  nombre: yup
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
    .number()
    .typeError('No se ingresó una día válido.')
    .required('El día de recordatorio es requerido.')
    .default(Number(moment().format('DD')))
    .max(31, 'El día de recordatorio no puede ser mayor a 31.')
    .min(1, 'El día de recordatorio debe ser mayor a 1.')
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
  displayName: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre debe tener como máximo 20 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s ]+$/, 'El nombre solo puede contener letras')
})

export { validationSchemaServices, validationSchemaGasto, validationSchemaUser }
