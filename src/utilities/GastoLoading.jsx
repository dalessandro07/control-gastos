import React from 'react'

const GastoLoading = () => {
  return (
    <li className="my-4 flex items-center justify-between py-2">
      <section className="flex w-1/2 grow items-center">
        <img className="mr-3 h-12 w-12 animate-pulse rounded-full bg-gray-300" alt="" />

        <section className="mr-5 h-6 w-4/6 animate-pulse bg-gray-300"></section>
      </section>

      <section className="ml-8 h-6 w-1/12 animate-pulse bg-gray-300 px-6 text-right text-sm"></section>

      <section className="ml-8 flex w-1/5 items-center justify-end text-red-500">
        <section className="mx-2 h-6 w-1/4 animate-pulse bg-gray-300 text-xl font-bold"></section>
        <section className="mx-2 h-6 w-3/4 animate-pulse bg-gray-300 text-xl font-bold"></section>
      </section>
    </li>
  )
}

export default GastoLoading
