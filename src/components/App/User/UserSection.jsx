import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../context/AuthContext'
import Modal from '../../../utilities/Modal'

import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const UserSection = () => {
  const { user, logout, deleteAccount, updateUser } = useAuth()

  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [showUpdateUser, setShowUpdateUser] = useState(false)

  const validationSchema = yup.object({
    displayName: yup
      .string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(20, 'El nombre debe tener como máximo 20 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s ]+$/, 'El nombre solo puede contener letras')
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const navigateTo = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.info('¡Sesión cerrada, hasta luego!')
    navigateTo('/login')
  }

  const handleDeleteAccount = async () => {
    await deleteAccount()
    toast.info('¡Cuenta eliminada!')
    navigateTo('/login')
  }

  const handleUpdateUser = async (data) => {
    if (data?.displayName === user?.displayName) {
      toast.info('¡No se han detectado cambios!')
    } else {
      try {
        const dataToUpdate = {
          displayName: data?.displayName.trim()
        }

        await updateUser(dataToUpdate)

        toast.success('¡Datos actualizados correctamente!')
        setShowUpdateUser(false)
      } catch (error) {
        toast.error('¡Ha ocurrido un error!')
      }
    }
  }

  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">
          ¡{`Bienvenid${user?.displayName?.at(-1) === 'a' ? 'a' : 'o'}`}!
        </h1>

        {user?.photoURL ? (
          <img className="mt-6 h-12 w-12 rounded-full object-cover" src={user?.photoURL} alt="" />
        ) : (
          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <p className="text-3xl text-white">{user?.displayName?.at(0) ?? 'U'}</p>
          </div>
        )}

        <p className="mt-2 flex text-xl font-bold text-sky-600">
          {user?.displayName ?? user?.email?.split('@')[0] ?? 'Usuario'}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#22c55e">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </p>

        {user?.phoneNumber && (
          <p className="font-semibold text-gray-600">
            {user?.phoneNumber?.length > 0 &&
              user?.phoneNumber?.replace('+', '').replace(/\d(?=\d{4})/g, '*')}
          </p>
        )}
      </header>

      <section className="flex flex-col items-center gap-2">
        {showUpdateUser && (
          <form onSubmit={handleSubmit(handleUpdateUser)}>
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
        )}

        <button
          onClick={() => {
            setShowUpdateUser(!showUpdateUser)
          }}
          className="mt-8 flex flex-col items-center rounded-full bg-blue-600 p-2 font-semibold text-white">
          {!showUpdateUser ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          )}
        </button>
        <p>{!showUpdateUser ? 'Actualizar datos' : 'Ocultar'}</p>
      </section>

      <section className="mt-8 flex flex-col items-center justify-center">
        <article className="flex flex-col items-center">
          <button
            onClick={handleLogout}
            className="flex items-center rounded-full bg-red-600 p-2 text-sm font-bold text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
          <p onClick={handleLogout} className="mb-4 cursor-pointer">
            Cerrar sesión
          </p>
        </article>

        <button
          onClick={() => {
            setShowDeleteAccount(!showDeleteAccount)
          }}
          className="mt-6 text-sm text-gray-600 underline">
          {showDeleteAccount ? 'Ocultar' : 'Deseo eliminar mi cuenta'}
        </button>

        {showDeleteAccount && (
          <article className="mt-8">
            <Modal
              titleModal="Eliminar mi cuenta ⚠️"
              paragraphModal="¿Está seguro?, esta acción no se puede deshacer, le recomendamos que exporte sus gastos antes de eliminar la cuenta."
              textButtonModal="Eliminar mi cuenta"
              callbackButtonConfirm={handleDeleteAccount}
            />
          </article>
        )}
      </section>
    </>
  )
}

export default UserSection
