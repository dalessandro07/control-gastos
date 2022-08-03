import React, { useContext, useState, useEffect, lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { SaldoContext } from '../../../context/SaldoContext'

import UserSection from '../User/UserSection'
import MainButtons from './buttons/MainButtons'
import BusquedaGastos from './BusquedaGastos'

import Loading from '../../utils/Loading'
import Page404 from '../../utils/Page404'

const NuevoGasto = lazy(() => import('./forms/NuevoGasto'))
const ListaDeGastos = lazy(() => import('./ListaDeGastos'))
const Balance = lazy(() => import('../balance/Balance'))
const Detalle = lazy(() => import('./gasto/Detalle'))
const Servicios = lazy(() => import('../servicios/Servicios'))

const Gastos = () => {
  const { gastos, moment, loading } = useContext(SaldoContext)
  const [gastosAMostrar, setGastosAMostrar] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/gastos') {
      setGastosAMostrar(null)
    }
  }, [pathname])

  return (
    <main className="flex grow flex-col">
      <section className="mt-4 grow rounded-t-3xl bg-gray-100 pt-2 shadow-2xl">
        <MainButtons />

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
            path="/gastos/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Detalle gastos={gastosAMostrar ?? gastos} />
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
      </section>
    </main>
  )
}

export default Gastos
