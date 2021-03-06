import React from 'react'

const ImportExport = ({ importarGastos, exportarGastos }) => (
  <>
    <section
      onClick={importarGastos}
      className="m-4 flex w-max cursor-pointer flex-col-reverse items-center justify-center gap-2 rounded-sm bg-gray-200 p-3 hover:bg-gray-300">
      <h4 className="mr-1 text-center text-sm font-bold">Restaurar una copia de seguridad</h4>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fillRule="evenodd"
          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
          clipRule="evenodd"
        />
      </svg>
    </section>

    <section
      onClick={exportarGastos}
      className="m-4 flex w-max cursor-pointer flex-col-reverse items-center justify-center gap-2 rounded-sm bg-gray-200 p-3 hover:bg-gray-300">
      <h4 className="text-center text-sm font-bold">Realizar copia de seguridad</h4>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fillRule="evenodd"
          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
          clipRule="evenodd"
        />
      </svg>
    </section>
  </>
)

export default ImportExport
