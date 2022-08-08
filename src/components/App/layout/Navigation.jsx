import React from 'react'
import MainButtons from '../gastos/buttons/MainButtons'

import { useColor } from '../../../context/ColorContext'

const Navigation = () => {
  const { colorActual } = useColor()

  return (
    <nav className={`fixed bottom-0 z-[999] w-full ${colorActual}`}>
      <MainButtons />
    </nav>
  )
}

export default Navigation
