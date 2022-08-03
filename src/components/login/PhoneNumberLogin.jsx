import React from 'react'
import { toast } from 'react-toastify'

import Loading from '../utils/Loading'

import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import usePhoneLogin from './hooks/usePhoneLogin'

const PhoneNumberLogin = () => {
  const { loading, showInputVerification, number, setNumber, verifyCode, handleSend } =
    usePhoneLogin()

  return (
    <section className="m-8 flex grow flex-col items-center justify-center">
      <h1 className="mx-auto mb-8 w-max pb-1 text-center text-xl font-semibold">¡Ingresa ya!</h1>

      <p className="my-4 text-center">
        Enviaremos un código de verificación a su número de teléfono.
      </p>

      {loading ? (
        <Loading />
      ) : (
        <>
          {!showInputVerification && (
            <div className="mb-6 mt-10">
              <PhoneInput
                defaultCountry="PE"
                placeholder="Ingrese el número."
                value={number}
                onChange={setNumber}
              />
            </div>
          )}

          {showInputVerification && (
            <input
              onChange={e => verifyCode(e.target.value)}
              className="my-6 mt-8 w-full border-b-2 border-amber-400 text-center text-2xl font-bold placeholder:text-base placeholder:font-normal"
              type="number"
              placeholder="Ingrese el código de verificación"
            />
          )}
        </>
      )}

      {!showInputVerification && (
        <button
          id="verify-button"
          onClick={
            isValidPhoneNumber(`${number}`)
              ? () => handleSend(number)
              : () => toast.error('Ingrese un número telefónico válido')
          }
          className="my-8 cursor-pointer rounded-full bg-amber-300 p-2 px-6 font-bold hover:bg-amber-400"
          type="submit">
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      )}
    </section>
  )
}

export default PhoneNumberLogin
