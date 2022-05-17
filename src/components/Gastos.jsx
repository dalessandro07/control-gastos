import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import NuevoGasto from './NuevoGasto'
import ListaDeGastos from './ListaDeGastos'
import Balance from './Balance'

const Gastos = ({ gastos }) => {
  return (
    <main className="mx-4">
      <header className="flex items-center justify-between">
        <Link to="/">
          <h2 className="font-semibold">Gastos:</h2>
        </Link>

        <nav>
          <Link to="/gastos">
            <button className="mx-1 rounded-sm bg-sky-300 py-1 px-2">Ver historial</button>
          </Link>

          <Link to="/nuevo-gasto">
            <button className="mx-1 rounded-sm bg-amber-300 py-1 px-2">Nuevo gasto</button>
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Balance />} />

        <Route path="/gastos" element={<ListaDeGastos gastos={gastos} />} />

        <Route path="/nuevo-gasto" element={<NuevoGasto />} />
      </Routes>
    </main>
  )
}

export default Gastos
