import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { SaldoContext } from '../context/SaldoContext'
import { actualizarGastoDB } from '../firebase'

import { useForm } from 'react-hook-form'
import { validationSchemaGasto } from '../utilities/ValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'

import moment from 'moment'
import { toast } from 'react-toastify'

import etiquetasOBJ from '../utilities/dataEtiquetas'

const useSendGasto = (mode = 'new') => {
  const { userUID } = useAuth()
  const [etiqueta, setEtiqueta] = useState('otros')
  const { gastos, agregarGasto } = useContext(SaldoContext)

  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaGasto)
  })

  useEffect(() => {
    if (mode !== 'edit') {
      const subscription = watch((value) => {
        const etiqueta = Object.keys(etiquetasOBJ).find((etiqueta) =>
          etiquetasOBJ[etiqueta].some((cadaEtiqueta) =>
            value.descripcion.toLowerCase().includes(cadaEtiqueta)
          )
        )
        setEtiqueta(etiqueta)
      })
      return () => subscription.unsubscribe()
    }
  }, [watch])

  const cambiarEtiqueta = (value) => {
    setEtiqueta(value)
  }

  const onSubmit = (data) => {
    if (data.idDB) {
      const dataActualizada = {
        ...data,
        id: gastos.find((gasto) => gasto.idDB === data.idDB).id,
        img: gastos.find((gasto) => gasto.idDB === data.idDB).img
      }

      actualizarGastoDB(data.idDB, dataActualizada, userUID)
      navigateTo('/gastos')
      toast.success('Gasto actualizado')
    } else {
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
      toast.success('¡Gasto agregado con éxito!')
    }
  }

  const setValueToForm = (gasto, mode) => {
    if (gasto.descripcion && (mode === 'edit' || mode === 'voice')) {
      setValue('monto', gasto.monto)
      setValue('fecha', gasto.fecha)
      setValue('descripcion', gasto.descripcion)
      setValue('idDB', gasto.idDB)
      setValue('etiqueta', gasto.etiqueta)
    } else {
      setValue('monto', '')
      setValue('fecha', moment().format('YYYY-MM-DD'))
      setValue('descripcion', '')
      setValue('etiqueta', 'otros')
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    etiqueta,
    cambiarEtiqueta,
    setValueToForm
  }
}

export default useSendGasto
