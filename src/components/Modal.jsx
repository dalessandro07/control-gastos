import React, { useState } from 'react'

const Modal = ({ textButtonModal, titleModal, paragraphModal, callbackButtonConfirm }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="rounded-sm bg-red-500 p-2 text-sm font-bold text-white hover:bg-red-700"
        type="button"
        onClick={() => setShowModal(true)}>
        {textButtonModal}
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">{titleModal}</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-lg leading-relaxed text-slate-500">{paragraphModal}</p>
                </div>
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:underline focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Cerrar
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-gray-800 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => {
                      callbackButtonConfirm()
                      setShowModal(false)
                    }}>
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}

export default Modal
