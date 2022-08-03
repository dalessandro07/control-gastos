import React from 'react'
import { DotPulse } from '@uiball/loaders'

const Loading = () => {
  return (
    <section className="mt-12 flex w-full items-center justify-center">
      <DotPulse size={45} speed={1.3} color="#FCD34D" />
    </section>
  )
}

export default Loading
