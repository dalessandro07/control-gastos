import React from 'react'

const Gasto = ({ gasto, moment }) => {
  return (
    <li className="my-4 flex items-center justify-between py-2" key={gasto.id}>
      <section className="flex w-1/3 grow items-center">
        <img
          className="mr-2 h-12 w-12 rounded-full object-cover"
          src={
            gasto.img ??
            'https://st4.depositphotos.com/34463872/41265/v/450/depositphotos_412656562-stock-illustration-shopping-bag-design-icon-shopping.jpg'
          }
          alt=""
        />

        <p className="grow overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {gasto.descripcion}
        </p>
      </section>

      <p className="w-1/3 text-right text-sm">{moment(gasto.fecha).format('DD MMMM YYYY')}</p>

      <section className="flex w-1/4 items-center justify-end text-red-500">
        <p className="text-sm">- S/</p>
        <p className="text-xl font-bold">{gasto.monto}</p>
      </section>
    </li>
  )
}

export default Gasto
