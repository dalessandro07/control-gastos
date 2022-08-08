import React from 'react'

import useChangeDivisa from './hooks/useChangeDivisa'

const SelectDivisa = () => {
  const { divisas, handleChangeDivisa, divisaActual } = useChangeDivisa()

  return (
    <article className="mb-8 flex flex-col">
      <h2 className="text-lg font-semibold">Selecciona una divisa</h2>

      <select
        onChange={handleChangeDivisa}
        className="my-3 p-2 shadow-lg"
        value={divisaActual?.divisa ?? ''}
        name="divisas"
        id="divisas">
        {Object.keys(divisas).map(key => (
          <option key={key} value={key}>
            {key} {divisas[key]}
          </option>
        ))}
      </select>
    </article>
  )
}

export default SelectDivisa
