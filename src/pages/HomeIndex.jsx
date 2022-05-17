import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SaldoContext } from '../context/SaldoContext'
import Saldo from '../components/Saldo'
import Gastos from './../components/Gastos'

const HomeIndex = () => {
  const navigateTo = useNavigate()
  const { gastos, saldoTotal } = useContext(SaldoContext)

  return (
    <>
      <header>
        <h1
          onClick={() => navigateTo('/')}
          className="relative my-6 cursor-pointer text-center font-dosis text-4xl font-bold">
          Control de gastos
        </h1>

        <Saldo saldoTotal={saldoTotal} />
      </header>

      <main>
        <Gastos gastos={gastos} />
      </main>

      <footer className="m-4 flex justify-end">
        <h2 className="text-center font-dosis text-sm">
          Fotos de{' '}
          <a className="border-b-2 border-amber-300 font-bold" href="https://www.pexels.com/es-es/">
            Pexels
          </a>
        </h2>
        <img className="ml-2 w-12" src="https://images.pexels.com/lib/api/pexels.png" alt="" />
      </footer>
    </>
  )
}

export default HomeIndex
