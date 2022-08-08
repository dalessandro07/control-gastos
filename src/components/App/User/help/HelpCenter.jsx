import React from 'react'

import { Button } from '@material-tailwind/react'
import DeleteAccount from './DeleteAccount'

const HelpCenter = () => {
  return (
    <section className="my-5 flex flex-col items-center gap-4">
      <header className="mb-5">
        <h3 className="text-lg font-bold">¿Cómo podemos ayudarte?</h3>
      </header>

      <section className="flex flex-col items-center gap-6">
        <Button variant="outlined" size="sm" color="gray">
          <a
            href="mailto:drios28@outlook.es?subject=Encontr%C3%A9%20un%20error.&body=Hola%20Alessandro%2C%20mi%20nombre%20es"
            className="flex items-center gap-2 text-gray-500">
            Reportar un error
          </a>
        </Button>

        <DeleteAccount />
      </section>
    </section>
  )
}

export default HelpCenter
