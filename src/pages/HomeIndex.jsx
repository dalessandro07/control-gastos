import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SaldoContext } from '../context/SaldoContext'
import Saldo from '../components/Saldo'
import Gastos from './../components/Gastos'

const HomeIndex = () => {
  const navigateTo = useNavigate()
  const { gastos, saldoTotal } = useContext(SaldoContext)

  return (
    <div className="flex h-screen flex-col">
      <header>
        <h1
          onClick={() => navigateTo('/')}
          className="relative my-6 cursor-pointer text-center font-dosis text-4xl font-bold">
          Control de gastos
        </h1>

        <Saldo saldoTotal={saldoTotal} />
      </header>

      <Gastos gastos={gastos} />
    </div>
  )
}

export default HomeIndex
