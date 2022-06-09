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
  const { servicios, gastos, agregarGasto } = useContext(SaldoContext)

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

  const cambiarEtiqueta = (value) => setEtiqueta(value)

  const submitEnviarGasto = (data) => {
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
      const dataIsService = servicios.find(
        (servicio) =>
          Number(servicio.monto) === Number(data.monto) && servicio.descripcion === data.descripcion
      )

      if (dataIsService) {
        const dataActualizada = {
          ...dataIsService,
          fecha: moment(data.fecha).add(1, 'months').format('YYYY-MM-DD')
        }

        actualizarGastoDB(dataIsService.idDB, dataActualizada, userUID)
      }

      agregarGasto(data)

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

      setEtiqueta(gasto.etiqueta)
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
    onSubmit: submitEnviarGasto,
    errors,
    etiqueta,
    cambiarEtiqueta,
    setValueToForm
  }
}

export default useSendGasto
