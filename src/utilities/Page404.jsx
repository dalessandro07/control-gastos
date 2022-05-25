import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <section className="mt-24 flex flex-col items-center justify-center">
      <p className="text-4xl text-red-600">404</p>
      <h2 className="text-2xl">No se encontró esta página.</h2>
      <Link className="mt-5 font-bold text-sky-600 underline" to="/">
        Ir al inicio
      </Link>
    </section>
  )
}

export default Page404
