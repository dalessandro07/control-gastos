import React, { useContext, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { SaldoContext } from '../../../context/SaldoContext'
import { useColor } from '../../../context/ColorContext'

import UserSection from '../User/UserSection'
import BusquedaGastos from './BusquedaGastos'

import Loading from '../../utils/Loading'
import Page404 from '../../utils/Page404'
import useGastosAMostrar from './hooks/useGastosAMostrar'

const Balance = lazy(() => import('../balance/Balance'))
const ListaDeGastos = lazy(() => import('./ListaDeGastos'))
const NuevoGasto = lazy(() => import('./forms/NuevoGasto'))
const Detalle = lazy(() => import('./gasto/Detalle'))
const Servicios = lazy(() => import('../servicios/Servicios'))

const GastosMainContainer = () => {
  const { gastos, moment, loading } = useContext(SaldoContext)
  const { setGastosAMostrar, gastosAMostrar } = useGastosAMostrar()

  const { changeColor } = useColor()

  return (
    <main className="mt-10 flex grow flex-col rounded-t-3xl bg-gradient-to-b from-gray-200 to-gray-50 pb-20">
      <ul className="flex gap-4 px-5 pt-5">
        <li
          onClick={() => changeColor('amber')}
          className="h-5 w-5 cursor-pointer rounded-full bg-amber-700"></li>
        <li
          onClick={() => changeColor('blue')}
          className="h-5 w-5 cursor-pointer rounded-full bg-blue-600"></li>
      </ul>

      <Routes>
        <Route path="/" element={<UserSection />} />

        <Route path="*" element={<Page404 />} />

        <Route
          path="/balance"
          element={
            <Suspense fallback={<Loading />}>
              <Balance />
            </Suspense>
          }
        />

        <Route
          path="/gastos"
          element={
            <Suspense fallback={<Loading />}>
              <>
                <BusquedaGastos
                  gastos={gastos}
                  gastosAMostrar={gastosAMostrar}
                  setGastosAMostrar={setGastosAMostrar}
                />

                <ListaDeGastos
                  gastos={gastosAMostrar ?? gastos}
                  moment={moment}
                  loading={loading}
                />
              </>
            </Suspense>
          }
        />

        <Route
          path="/gastos/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Detalle gastos={gastosAMostrar ?? gastos} />
            </Suspense>
          }
        />

        <Route
          path="/nuevo-gasto/*"
          element={
            <Suspense fallback={<Loading />}>
              <NuevoGasto mode="new" />
            </Suspense>
          }
        />

        <Route
          path="/editar-gasto/:id/*"
          element={
            <Suspense fallback={<Loading />}>
              <NuevoGasto mode="edit" />
            </Suspense>
          }
        />

        <Route
          path="/servicios"
          element={
            <Suspense fallback={<Loading />}>
              <Servicios />
            </Suspense>
          }
        />
      </Routes>
    </main>
  )
}

export default GastosMainContainer
