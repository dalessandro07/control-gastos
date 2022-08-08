import React, { useState, createContext, useContext } from 'react'

export const colorContext = createContext({
  colorActual: '',
  changeColor: () => {}
})

export const useColor = () => {
  const context = useContext(colorContext)
  if (!context) {
    throw new Error('Error, no hay un proveedor de colores.')
  }
  return context
}

const ColorProvider = ({ children }) => {
  const [colorActual, setColorActual] = useState('bg-gradient-to-r from-amber-600 to-amber-800')
  const [resumeColor, setResumeColor] = useState('amber')

  const changeColor = color => {
    if (color === 'amber') {
      setColorActual('bg-gradient-to-r from-amber-600 to-amber-900')
      setResumeColor('amber')
    } else if (color === 'blue') {
      setColorActual('bg-gradient-to-r from-indigo-600 to-blue-600')
      setResumeColor('blue')
    }
  }

  return (
    <colorContext.Provider value={{ colorActual, changeColor, resumeColor }}>
      {children}
    </colorContext.Provider>
  )
}

export default ColorProvider
