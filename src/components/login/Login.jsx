import React, { useState } from 'react'

import EmailLogin from './utils/EmailLogin'
import MainButtonsLogin from './utils/MainButtonsLogin'

const Login = () => {
  const [showEmailLogin, setShowEmailLogin] = useState(false)

  return (
    <section className="my-6 flex grow flex-col items-center justify-center">
      <h1 className="my-8 w-2/3 pb-1 text-2xl font-semibold leading-9 xsm:text-[28px]">
        {showEmailLogin
          ? 'Inicia sesión en tu cuenta.'
          : 'Empieza a registrar tus gastos de manera más eficiente y ten el control.'}
      </h1>

      {!showEmailLogin && (
        <MainButtonsLogin showEmailLogin={showEmailLogin} setShowEmailLogin={setShowEmailLogin} />
      )}

      {showEmailLogin && <EmailLogin />}
    </section>
  )
}

export default Login
