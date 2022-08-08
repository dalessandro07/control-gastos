import React from 'react'

const HelpCenter = () => {
  return (
    <section className="my-5 flex flex-col items-center gap-4">
      <h3 className="font-bold">¿Cómo podemos ayudarte?</h3>

      <a
        href="mailto:drios28@outlook.es?subject=Encontr%C3%A9%20un%20error.&body=Hola%20Alessandro%2C%20mi%20nombre%20es"
        className="flex items-center gap-2 text-sm text-gray-500 hover:underline">
        Reportar un error
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </section>
  )
}

export default HelpCenter
