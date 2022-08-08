import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaUser } from '../../utils/ValidationSchema'

import { useAuth } from '../../../context/AuthContext'

import useUpdateUser from './hooks/useUpdateUser'

const ChangeName = () => {
  const { user } = useAuth()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemaUser)
  })

  const { handleUpdateUser } = useUpdateUser()

  return (
    <>
      <form className="mb-4 -mt-5" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="mt-10 mb-5 flex flex-col items-center">
          <label htmlFor="displayName" className="text-gray-600">
            Cambiar nombre
          </label>

          <input
            {...register('displayName')}
            type="text"
            placeholder={user?.displayName}
            className="m-4 rounded-lg border border-gray-400 p-2 shadow-md"
          />

          {errors?.displayName && (
            <p className="text-xs text-red-600">{errors?.displayName?.message}</p>
          )}

          <button
            type="submit"
            className={`${
              isSubmitting || !isValid || !isDirty
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            } m-4 rounded-lg bg-green-500 p-2 text-white`}
            disabled={!isValid || isSubmitting || !isDirty}>
            Actualizar
          </button>
        </div>
      </form>
    </>
  )
}

export default ChangeName
