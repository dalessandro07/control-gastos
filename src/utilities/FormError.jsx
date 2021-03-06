import React from 'react'

const FormError = ({ errors }) => {
  const campos = Object.keys(errors) || []

  return (
    <>
      {campos.map((campo) => (
        <p key={campo} className="px-8 text-sm text-red-500">
          * {errors[campo]?.message}
        </p>
      ))}
    </>
  )
}

export default FormError
