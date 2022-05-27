import React, { useEffect, memo } from 'react'
import { Link, Routes, Route, useSearchParams } from 'react-router-dom'

import moment from 'moment'

import useSendGasto from '../../../hooks/useSendGasto'
import useEditGasto from '../../../hooks/useEditGasto'
import useSeo from '../../../hooks/useSeo'
import FormNuevoGasto from './FormNuevoGasto'
import VoiceForm from './VoiceForm'
import Calculadora from '../Functions/Calculadora'

const fechasRelativas = {
  anteayer: moment().subtract(2, 'days').format('YYYY-MM-DD'),
  ayer: moment().subtract(1, 'day').format('YYYY-MM-DD'),
  hoy: moment().format('YYYY-MM-DD'),
  día: moment().format('YYYY-MM-DD'),
  dia: moment().format('YYYY-MM-DD'),
  mañana: moment().add(1, 'days').format('YYYY-MM-DD'),
  pasado: moment().add(2, 'days').format('YYYY-MM-DD')
}

const NuevoGasto = ({ mode }) => {
  const { errors, etiqueta, cambiarEtiqueta, handleSubmit, onSubmit, register, setValueToForm } =
    useSendGasto()
  const { title, button, gasto } = useEditGasto(mode)

  const [params] = useSearchParams()

  useEffect(() => {
    if (params.has('monto')) {
      const descripcion = params.get('descripcion') || ''
      const monto = Number(params.get('monto')) || 0
      const fecha = fechasRelativas[params.get('fecha')] || fechasRelativas.hoy
      const etiqueta = params.get('etiqueta') || 'otros'

      const queryURL = {
        descripcion,
        monto,
        fecha,
        etiqueta
      }

      setValueToForm(queryURL, 'voice')
    }

    return () => {
      setValueToForm({}, 'new')
    }
  }, [params.has('monto')])

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
    <section className="my-5 rounded-sm pb-4">
      <header>
        <h2 className="pt-4 text-center text-lg font-semibold">{title} gasto</h2>

        {mode !== 'edit' && (
          <nav className="mt-8 flex flex-col items-center gap-4 xs:flex-row xs:justify-around xs:gap-2">
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
            <Link to="/nuevo-gasto/calculadora">
              <button className="flex bg-indigo-300 p-2">
                <p className="mr-2">Calculadora</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </nav>
        )}
      </header>

      <Routes>
        <Route path="/formulario" element={<FormNuevoGasto value={valueToForm} />} />

        <Route path="/voz" element={<VoiceForm />} />

        <Route path="/calculadora" element={<Calculadora />} />
      </Routes>

      <footer className="mx-auto mt-8 mb-[-15px] w-3/4">
        <p className="text-sm text-gray-600">
          * Los datos ingresados serán{' '}
          <span className="font-bold">
            {' '}
            encriptados y enviados de forma segura a la base de datos.
          </span>
          <span className="font-bold"> Sólo usted</span> podrá ver los datos que ingrese.
        </p>
      </footer>
    </section>
  )
}

export default memo(NuevoGasto)
