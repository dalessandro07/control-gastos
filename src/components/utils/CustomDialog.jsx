import React, { useState } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

import useResizeWindow from '../../hooks/useResizeWindow'

export default function CustomDialog({ buttonText, header, children }) {
  const { width } = useResizeWindow()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const animation = {
    mount: { scale: 1, y: 0 },
    unmount: { scale: 0.9, y: -100 }
  }

  return (
    <>
      <Button color="red" size="sm" onClick={handleOpen} variant="outlined">
        {buttonText}
      </Button>

      <Dialog
        animate={animation}
        size={width < 380 ? 'xxl' : 'xl'}
        open={open}
        handler={handleOpen}>
        <DialogHeader>{header}</DialogHeader>
        <DialogBody divider>{children}</DialogBody>
        <DialogFooter className="justify-start">
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
