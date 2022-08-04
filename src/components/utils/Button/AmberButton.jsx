import React from 'react'

const AmberButton = ({ children, handleClick = () => {}, submit, isSubmitting = false }) => (
  <button
    type={submit ? 'submit' : 'button'}
    disabled={isSubmitting}
    onClick={handleClick}
    className="m-auto my-6 flex w-max cursor-pointer items-center rounded-full bg-amber-400 p-2 px-6 hover:animate-pulse active:animate-ping">
    <p className="text-sm font-semibold xsm:text-base">{children}</p>
  </button>
)

export default AmberButton
