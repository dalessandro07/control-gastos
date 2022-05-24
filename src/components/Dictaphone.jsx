import React, { memo } from 'react'
import 'regenerator-runtime/runtime.js'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Link } from 'react-router-dom'

const Dictaphone = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return (
      <span className="m-6 text-center text-lg text-red-500">
        El navegador no es compatible con reconocimiento de voz.
      </span>
    )
  }

  const recoverFieldsFromTranscript = () => {
    const fields = transcript?.split(' ')

    const monto = fields?.find((field) => field.match(/^\d+$/))

    const fecha = fields?.find((field) => field.match(/^(hoy|mañana|pasado|anteayer|ayer)$/))

    const descripcion = fields
      ?.filter(
        (field) => field !== monto && field !== fecha && field !== 'soles' && field.length > 1
      )
      .join(' ')

    return { descripcion, monto, fecha }
  }

  const result = recoverFieldsFromTranscript()

  return (
    <article className="mt-5 flex flex-col items-center justify-center">
      <button
        onClick={SpeechRecognition.startListening}
        className={`mt-6 rounded-full border-4 p-4 ${
          listening ? 'animate-pulse border-green-600' : 'border-neutral-300'
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14"
          viewBox="0 0 20 20"
          fill={listening ? '#16a34a' : '#a3a3a3'}>
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {transcript && <p className="mt-5 text-gray-800">{transcript}</p>}

      <Link
        to={`/nuevo-gasto/formulario?${new URLSearchParams(result).toString()}`}
        className="m-6 rounded-sm bg-green-600 p-2 text-gray-100 shadow-md">
        Confirmar
      </Link>
    </article>
  )
}

export default memo(Dictaphone)
