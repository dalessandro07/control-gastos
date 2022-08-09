import React from 'react'
import { useForm } from 'react-hook-form'

import { useColor } from '../../../../context/ColorContext'

import useDeleteAccount from './hooks/useDeleteAccount'

import CustomDialog from '../../../utils/Dialog/CustomDialog'
import CustomInput from '../../../utils/Input/CustomInput'
import ErrorAlert from '../../../utils/Error/ErrorAlert'

import { Button } from '@material-tailwind/react'

const DeleteAccount = () => {
  const { resumeColor } = useColor()

  const { loginProvider, onSubmit, isValidCredential } = useDeleteAccount()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  return (
    <CustomDialog isSubmit buttonText="Eliminar mi cuenta" header="⚠️ ¿Desea eliminar su cuenta?">
      <div className="flex flex-col items-start gap-8 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="mb-8">
            <p className="text-sm">
              Si elimina su cuenta, se eliminarán todos los datos relacionados con ella y no podrá
              recuperarlos.
            </p>
          </header>

          <div className="mb-5 flex flex-col items-center gap-5">
            <CustomInput
              label={
                loginProvider === 'email'
                  ? 'Ingrese su correo electrónico'
                  : 'Ingrese su número de teléfono'
              }
              name={loginProvider}
              color={resumeColor}
              register={register}
              errors={errors}
            />
          </div>

          <Button className="mb-5" type="submit" size="sm" color="red">
            Eliminar
          </Button>

          {!isValidCredential && <ErrorAlert text="Credenciales inválidas" color="red" />}
        </form>
      </div>
    </CustomDialog>
  )
}

export default DeleteAccount
