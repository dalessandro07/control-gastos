import React, { useContext, useState, useEffect, lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { SaldoContext } from '../../../context/SaldoContext'

import Loading from '../../../utilities/Loading'
import Page404 from '../../../utilities/Page404'
import UserSection from '../user/UserSection'
import BusquedaGastos from './BusquedaGastos'
import MainButton from '../../../utilities/MainButton'

const NuevoGasto = lazy(() => import('../forms/NuevoGasto'))
const ListaDeGastos = lazy(() => import('./ListaDeGastos'))
const Balance = lazy(() => import('./Balance'))
const Detalle = lazy(() => import('../info/Detalle'))
const Servicios = lazy(() => import('./Servicios'))

const Gastos = () => {
  const { gastos, moment, loading } = useContext(SaldoContext)

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/gastos') {
      setGastosAMostrar(null)
    }
  }, [pathname])

  const [gastosAMostrar, setGastosAMostrar] = useState(null)

  const mainButtons = [
    {
      url: '/balance',
      pathsIcon: [
        'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z',
        'M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'
      ],
      title: 'Balance'
    },
    {
      url: '/gastos',
      pathsIcon: [
        'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
      ],
      title: 'Historial'
    },
    {
      url: '/nuevo-gasto',
      pathsIcon: [
        'M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
      ],
      title: 'Nuevo gasto'
    },
    {
      url: '/servicios',
      pathsIcon: [
        'M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z'
      ],
      title: 'Servicios'
    }
  ]

  return (
    <main className="flex grow flex-col">
      <header className="mt-6 mb-2 flex items-center justify-between">
        <nav className="flex w-full justify-around">
          {mainButtons.map((button, index) => (
            <MainButton
              key={index}
              url={button.url}
              pathsIcon={button.pathsIcon}
              title={button.title}
            />
          ))}
        </nav>
      </header>

      <section className="mt-4 grow rounded-t-3xl bg-gray-100 pt-2 shadow-2xl">
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
