import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaServices } from '../../utils/ValidationSchema'

import { useColor } from '../../../context/ColorContext'
import useHandleServices from './hooks/useHandleServices'

import CustomInput from '../../utils/Input/CustomInput'
import CustomTextarea from '../../utils/Input/CustomTextArea'

import { Button } from '@material-tailwind/react'
import CustomDialog from './../../utils/Dialog/CustomDialog'

const FormNewService = () => {
  const { onAddService } = useHandleServices()
  const { resumeColor } = useColor()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaServices)
  })

  return (
    <CustomDialog header="Nuevo servicio" type="new" buttonText="Agregar servicio">
      <form onSubmit={handleSubmit(onAddService)} className="mx-auto my-5 flex flex-col gap-5">
        <CustomInput name="nombreServicio" register={register} errors={errors} />

        <CustomInput name="monto" register={register} errors={errors} />

        <CustomInput name="fecha" register={register} errors={errors} />

        <CustomTextarea name="descripcion" register={register} errors={errors} />

        <Button type="submit" variant="gradient" color={resumeColor}>
          Guardar
        </Button>
      </form>
    </CustomDialog>
  )
}

export default FormNewService
