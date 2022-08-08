import React, { useState } from 'react'
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'

import AccordionIcon from './utils/AccordionIcon'
import useOptionsUserData from './hooks/useOptionsUserData'

export default function UserOptions() {
  const { userOptions } = useOptionsUserData()
  const [open, setOpen] = useState(0)

  const handleOpen = value => setOpen(open === value ? 0 : value)

  return (
    <section className="my-10 w-full px-8">
      {userOptions.map(({ id, title, icon, content }) => (
        <Accordion
          className={
            open === id ? 'child:!h-auto child:!overflow-y-auto child:!overflow-x-hidden' : ''
          }
          icon={<AccordionIcon id={id} open={open} />}
          key={id}
          open={open === id}
          onClick={() => handleOpen(id)}>
          <AccordionHeader className="relative">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                {icon}
                {title}
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody onClick={e => e.stopPropagation()}>{content}</AccordionBody>
        </Accordion>
      ))}
    </section>
  )
}
