import React from 'react'
import Dictaphone from '../../../utilities/Dictaphone'

const VoiceForm = () => {
  return (
    <section>
      <header className="mt-8 flex justify-center">
        <h2 className="text-lg font-bold">Formulario mediante voz</h2>
      </header>

      <section id="voice-form" className="flex flex-col items-center">
        <Dictaphone />

        <p className="text-center text-xs xs:text-sm">
          Puede decir algo como: <br />
          <span className="text-blue-500">Pan con pollo, 5 soles, hoy</span>
        </p>
      </section>
    </section>
  )
}

export default VoiceForm
