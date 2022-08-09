import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../../context/AuthContext'
import { SaldoContext } from '../../../../context/SaldoContext'

import { agregarGastoDB, borrarGastoDB } from '../../../../firebase'

import moment from 'moment'
import { toast } from 'react-toastify'

const useHandleServices = () => {
  const { servicios } = useContext(SaldoContext)

  const { userUID } = useAuth()
  const navigateTo = useNavigate()

  const [showFormDeleteService, setShowFormDeleteService] = useState(false)

  const [servicioABorrar, setServicioABorrar] = useState('')
  const [existeServicioABorrar, setExisteServicioABorrar] = useState(false)

  useEffect(() => {
    const existeServicio = servicios.find(
      servicio => servicio?.nombre?.toLowerCase() === servicioABorrar.toLowerCase()
    )

    if (existeServicio) setExisteServicioABorrar(true)
    if (!existeServicio) setExisteServicioABorrar(false)
  }, [servicioABorrar])

  const onAddService = async data => {
    const { nombreServicio, monto, descripcion, fecha } = data

    const isoDate = new Date(fecha).toISOString()
    const expiredDate = moment(isoDate).format('L')
    const descriptionService = descripcion.charAt(0).toUpperCase() + descripcion.slice(1)

    const dataToSend = {
      nombre: nombreServicio,
      monto,
      fecha: expiredDate,
      descripcion: descriptionService
    }

    try {
      agregarGastoDB(dataToSend, userUID)
      toast.success('¡Servicio agregado con éxito!')
    } catch (error) {
      toast.error('Error: ' + error.message)
    }
  }

  const agregarServicioComoGasto = servicio => {
    const { nombre, fecha, monto, descripcion } = servicio

    const url = `/nuevo-gasto/formulario?monto=${monto}&descripcion=${descripcion}&nombre=${nombre}&fecha=${fecha}&etiqueta=servicios`

    navigateTo(url)
  }

  const handleDeleteService = servicio => {
    const servicioABorrar = servicios.find(
      servicioDB => servicio?.toLowerCase() === servicioDB?.nombre?.toLowerCase()
    )

    if (servicioABorrar) {
      try {
        borrarGastoDB(servicioABorrar.idDB, userUID)
        toast.info(
          `Servicio "${
            servicio.charAt(0).toUpperCase() + servicio.slice(1)
          }" borrado correctamente.`
        )
        setShowFormDeleteService(false)
        setServicioABorrar('')
      } catch (error) {
        toast.error(
          `Error al borrar servicio ${servicio.charAt(0).toUpperCase() + servicio.slice(1)} | ${
            error?.message
          }`
        )
      }
    }
  }

  return {
    onAddService,
    agregarServicioComoGasto,
    handleDeleteService,
    showFormDeleteService,
    setShowFormDeleteService,
    servicioABorrar,
    setServicioABorrar,
    existeServicioABorrar
  }
}

export default useHandleServices
