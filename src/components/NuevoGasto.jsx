import React, { useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import moment from 'moment'

import usePrepGasto from '../hooks/usePrepGasto'
import useEditGasto from '../hooks/useEditGasto'
import useSeo from '../hooks/useSeo'
import FormNuevoGasto from './FormNuevoGasto'
import VoiceForm from './VoiceForm'

const NuevoGasto = ({ mode }) => {
  const { errors, etiqueta, cambiarEtiqueta, handleSubmit, onSubmit, register, setValueToForm } =
    usePrepGasto()

  const { title, button, gasto } = useEditGasto(mode)

  useSeo({
    title: `${title} gasto`,
    description: `Formulario para ${title !== 'Editar' ? 'agregar un' : 'editar un'} gasto`
  })

  useEffect(() => {
    if (mode === 'edit') {
      setValueToForm(gasto, mode)
      cambiarEtiqueta(gasto.etiqueta)
    }
  }, [mode])

  const valueToForm = {
    errors,
    etiqueta,
    handleSubmit,
    onSubmit,
    register,
    moment,
    cambiarEtiqueta,
    button
  }

  return (
    <section className="my-8 rounded-sm pb-4">
      <header>
        <h2 className="pt-4 text-center text-lg font-semibold">{title} gasto</h2>

        {mode !== 'edit' && (
          <nav className="mt-8 flex justify-around">
            <Link to="/nuevo-gasto/formulario" className="bg-amber-300 p-2">
              Formulario
            </Link>
            <Link to="/nuevo-gasto/voz" className="flex bg-indigo-300 p-2">
              <p className="mr-2">Mediante Voz</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        )}
      </header>

      <Routes>
        <Route path="/formulario" element={<FormNuevoGasto value={valueToForm} />} />

        <Route path="/voz" element={<VoiceForm />} />
      </Routes>
    </section>
  )
}

export default NuevoGasto
