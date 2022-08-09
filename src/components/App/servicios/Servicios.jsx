import React, { useContext, memo } from 'react'

import { SaldoContext } from '../../../context/SaldoContext'
import useHandleServices from './hooks/useHandleServices'

import ContainerServices from './ContainerServices'
import FormNewService from './FormNewService'

import Loading from '../../utils/Loading'
import Modal from '../../utils/Modal'

const Servicios = () => {
  const { servicios, loading } = useContext(SaldoContext)

  const {
    agregarServicioComoGasto,
    handleDeleteService,
    setShowFormDeleteService,
    setServicioABorrar,
    servicioABorrar,
    existeServicioABorrar,
    showFormDeleteService
  } = useHandleServices()

  return (
    <section className="mt-10 flex flex-col">
      <header>
        <h3 className="text-center text-lg font-bold">Mis servicios</h3>
        <section className="mx-6 my-4 flex flex-col items-start">
          <p className="text-sm text-gray-600">
            Ahorra tiempo al registrar servicios o gastos cuyo monto no varía, como por ejemplo:
          </p>
          <p className="mt-2 text-sm font-bold text-blue-500">Internet o teléfono</p>
        </section>
      </header>

      <section>
        {loading ? (
          <Loading />
        ) : (
          servicios.length > 0 && (
            <ContainerServices
              servicios={servicios}
              agregarServicioComoGasto={agregarServicioComoGasto}
            />
          )
        )}
      </section>

      <footer className="my-8 flex flex-col items-center gap-5">
        <FormNewService />

        {showFormDeleteService && (
          <section className="mx-16 flex flex-col gap-2">
            <input
              onChange={e => setServicioABorrar(e.target.value)}
              type="text"
              placeholder="Ingrese el servicio"
              className="rounded-md border-2 border-gray-200 p-2"
            />

            {existeServicioABorrar ? (
              <Modal
                callbackButtonConfirm={() => handleDeleteService(servicioABorrar)}
                textButtonModal="Eliminar"
                css="flex justify-center gap-2 p-2"
                titleModal="¿Desea eliminar este servicio?"
                paragraphModal={`Está a punto de eliminar el servicio "${
                  servicioABorrar.charAt(0).toUpperCase() + servicioABorrar.slice(1)
                }", esta acción no se puede deshacer. ¿Desea continuar?`}
                textButtonConfirm="Sí, eliminar"
              />
            ) : (
              ''
            )}
          </section>
        )}

        <div className="flex flex-col gap-4">
          {servicios?.length > 0 && (
            <button
              onClick={() => setShowFormDeleteService(!showFormDeleteService)}
              className="text-sm text-gray-500 underline transition-all duration-200 hover:text-black">
              {showFormDeleteService ? 'Cerrar' : 'Eliminar servicio'}
            </button>
          )}
        </div>
      </footer>
    </section>
  )
}

export default memo(Servicios)
