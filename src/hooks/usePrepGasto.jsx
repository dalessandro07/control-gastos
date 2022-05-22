import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { SaldoContext } from '../context/SaldoContext'

const frutas = [
  'manzana',
  'pera',
  'piña',
  'naranja',
  'sandia',
  'fresa',
  'ciruela',
  'limon',
  'uva',
  'mango',
  'aguacate',
  'cereza',
  'ciruela'
]

const verduras = [
  'tomate',
  'cebolla',
  'pimiento',
  'espinaca',
  'zanahoria',
  'papa',
  'camote',
  'apio',
  'brocoli'
]

const etiquetasOBJ = {
  comida: [
    'comida',
    'fruta',
    'verdura',
    'carne',
    'pescado',
    'cereal',
    'lacteos',
    'bebidas',
    'mercado',
    'metro',
    'wong',
    'supermercado',
    'plaza-vea',
    ...frutas,
    ...verduras
  ],
  transporte: ['transporte', 'pasaje', 'carro', 'auto', 'moto', 'taxi', 'bus', 'combi', 'autobus'],
  ropa: ['ropa', 'zapatilla', 'accesorio', 'camisa', 'pantalon', 'calzado', 'vestido', 'jean'],
  hogar: ['hogar', 'casa', 'limpieza', 'tocador', 'baño'],
  salud: ['salud', 'medicamento', 'medicina', 'pastilla', 'shampoo', 'hospital', 'consulta'],
  aseo: ['aseo', 'cama', 'baño', 'cocina', 'lavanderia', 'cuidado', 'cepillo', 'corte', 'cabello'],
  educacion: [
    'educacion',
    'escuela',
    'libro',
    'curso',
    'universidad',
    'colegio',
    'estudio',
    'útiles',
    'utiles'
  ],
  servicios: [
    'servicios',
    'servicio',
    'luz',
    'agua',
    'telefono',
    'internet',
    'teléfono',
    'cable',
    'celu'
  ]
}

const useSendGasto = () => {
  const [etiqueta, setEtiqueta] = useState('otros')
  const { agregarGasto } = useContext(SaldoContext)

  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    const subscription = watch((value) => {
      const etiqueta = Object.keys(etiquetasOBJ).find((etiqueta) =>
        etiquetasOBJ[etiqueta].some((cadaEtiqueta) =>
          value.descripcion.toLowerCase().includes(cadaEtiqueta)
        )
      )
      setEtiqueta(etiqueta)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const cambiarEtiqueta = (value) => {
    setEtiqueta(value)
  }

  const onSubmit = (data) => {
    if (!etiqueta) {
      setEtiqueta(data.etiqueta)
      agregarGasto(data)
    } else {
      const nuevaData = {
        ...data,
        etiqueta
      }
      agregarGasto(nuevaData)
    }

    navigateTo('/gastos')
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    etiqueta,
    cambiarEtiqueta
  }
}

export default useSendGasto
