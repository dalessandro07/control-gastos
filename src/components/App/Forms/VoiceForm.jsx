import React from 'react'
import Dictaphone from '../../../utilities/Dictaphone'

const VoiceForm = () => {
  return (
    <section>
      <header className="mt-8 flex justify-center">
        <h2 className="text-lg font-bold">Formulario mediante voz</h2>
      </header>

      <section id="voice-form" className="flex flex-col justify-center">
        <Dictaphone />
      </section>
    </section>
  )
}

export default VoiceForm
