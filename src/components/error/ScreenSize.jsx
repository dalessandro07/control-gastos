import React from 'react'
import Footer from '../app/layout/Footer'

const ScreenSize = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mx-4 flex grow items-center gap-5">
        <img
          className="full h-10 w-10 rounded-full"
          src="https://play-lh.googleusercontent.com/V6TSj9QIoCp8-zK9S-PVU8uHfqrTk0dwzvqtmMGSA_s_c3v9LypsfRMQChUNhMyNiQ"
          alt=""
        />

        <h1 className="relative my-6 cursor-pointer text-center font-dosis text-2xl font-bold">
          AllExpenses App
        </h1>
      </div>

      <p className="w-1/2 grow text-center font-medium">
        Por el momento la aplicación sólo está disponible para dispositivos móviles, pero pronto
        estará disponible para todos los dispositivos.
      </p>

      <Footer />
    </div>
  )
}

export default ScreenSize
