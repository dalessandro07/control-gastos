import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { SaldoContext } from '../context/SaldoContext'

import { agregarGastoDB, borrarGastoDB } from '../firebase'

import moment from 'moment'
import { toast } from 'react-toastify'

const useHandleServices = () => {
  const { servicios } = useContext(SaldoContext)

  const { userUID } = useAuth()
  const navigateTo = useNavigate()

  const [showFormNewService, setShowFormNewService] = useState(false)
  const [showFormDeleteService, setShowFormDeleteService] = useState(false)

  const [servicioABorrar, setServicioABorrar] = useState('')
  const [existeServicioABorrar, setExisteServicioABorrar] = useState(false)

  const [fechaDefault, setFechaDefault] = useState(moment().format('DD'))

  const cambiarFecha = (fecha) => setFechaDefault(fecha)

  useEffect(() => {
    const existeServicio = servicios.find(
      (servicio) => servicio?.nombre?.toLowerCase() === servicioABorrar.toLowerCase()
    )

    if (existeServicio) setExisteServicioABorrar(true)
    if (!existeServicio) setExisteServicioABorrar(false)
  }, [servicioABorrar])

  const onAddService = async (data) => {
    const actualMonth = moment().format('MM')
    const actualYear = moment().format('YYYY')

    const fecha = moment(`${actualYear}-${actualMonth}-${fechaDefault}`, 'YYYY-MM-DD')
      .add(1, 'monts')
      .format('YYYY-MM-DD')

    const descripcion = `${data?.descripcion
      ?.toLowerCase()
      .charAt(0)
      .toUpperCase()}${data.descripcion.toLowerCase().slice(1)} - ${moment(fecha).format(
      'MMMM [de] YYYY'
    )}`

    const dataToSend = {
      ...data,
      fecha,
      descripcion
    }

    try {
      agregarGastoDB(dataToSend, userUID)
      toast.success('¡Servicio agregado con éxito!')
      setShowFormNewService(false)
    } catch (error) {
      toast.error('Error: ' + error.message)
    }
  }

  const agregarServicioComoGasto = (servicio) => {
    const { nombre, fecha, monto, descripcion } = servicio

    const url = `/nuevo-gasto/formulario?monto=${monto}&descripcion=${descripcion}&nombre=${nombre}&fecha=${fecha}&etiqueta=servicios`

    navigateTo(url)
  }

  const handleDeleteService = (servicio) => {
    const servicioABorrar = servicios.find(
      (servicioDB) => servicio?.toLowerCase() === servicioDB?.nombre?.toLowerCase()
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
    showFormNewService,
    setShowFormNewService,
    showFormDeleteService,
    setShowFormDeleteService,
    servicioABorrar,
    setServicioABorrar,
    existeServicioABorrar,
    fechaDefault,
    cambiarFecha
  }
}

export default useHandleServices
