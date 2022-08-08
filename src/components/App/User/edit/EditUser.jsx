import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaName } from '../../../utils/ValidationSchema'

import { useColor } from '../../../../context/ColorContext'
import useUpdateUser from './hooks/useUpdateUser'
import CustomInput from '../../../utils/Input/CustomInput'

import { Button } from '@material-tailwind/react'

const EditUser = () => {
  const { resumeColor } = useColor()
  const { handleUpdateUser } = useUpdateUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaName)
  })

  return (
    <form className="mb-4 -mt-5" onSubmit={handleSubmit(handleUpdateUser)}>
      <section className="mt-10 mb-5 flex flex-col items-center">
        <article className="flex flex-col gap-5">
          <div className="flex flex-col">
            <CustomInput
              name="nombre"
              register={register}
              errors={errors}
              color={resumeColor}
              label="Cambiar nombre"
            />
          </div>
        </article>

        <Button
          variant="gradient"
          color={resumeColor}
          type="submit"
          size="sm"
          className={`${
            isSubmitting || !isValid || !isDirty
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          } mt-5`}
          disabled={!isValid || isSubmitting || !isDirty}>
          Actualizar
        </Button>
      </section>
    </form>
  )
}

export default EditUser
