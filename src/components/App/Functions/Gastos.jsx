import React, { useContext, lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import { SaldoContext } from '../../../context/SaldoContext'

import Loading from '../../../utilities/Loading'
import UserSection from '../User/UserSection'

import Page404 from '../../../utilities/Page404'

const NuevoGasto = lazy(() => import('../Forms/NuevoGasto'))
const ListaDeGastos = lazy(() => import('./ListaDeGastos'))
const Balance = lazy(() => import('./Balance'))
const Detalle = lazy(() => import('../Info/Detalle'))

const Gastos = () => {
  const { gastos, moment, loading } = useContext(SaldoContext)

  return (
    <main className="flex grow flex-col">
      <header className="mt-6 mb-2 flex items-center justify-between">
        <nav className="flex w-full justify-around">
          <Link to="/balance">
            <button className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-2 hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                viewBox="0 0 20 20"
                fill="#fcfcfc">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <p className="text-sm text-gray-100">Balance</p>
            </button>
          </Link>

          <Link to="/gastos">
            <button className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-2 hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                viewBox="0 0 20 20"
                fill="#fcfcfc">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-100">Historial</p>
            </button>
          </Link>

          <Link to="/nuevo-gasto">
            <button className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-2 hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                viewBox="0 0 20 20"
                fill="#fcfcfc">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-100">Nuevo gasto</p>
            </button>
          </Link>
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
                <Detalle gastos={gastos} />
              </Suspense>
            }
          />

          <Route
            path="/gastos"
            element={
              <Suspense fallback={<Loading />}>
                <ListaDeGastos gastos={gastos} moment={moment} loading={loading} />
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
        </Routes>
      </section>
    </main>
  )
}

export default Gastos
