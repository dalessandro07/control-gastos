import React, { useState } from 'react'

import { useColor } from '../../../context/ColorContext'
import useResizeWindow from '../../../hooks/useResizeWindow'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

export default function CustomDialog({
  buttonText,
  header,
  children,
  type = '',
  color = '',
  variant = ''
}) {
  const { width } = useResizeWindow()
  const { resumeColor } = useColor()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const animation = {
    mount: { scale: 1, y: 0 },
    unmount: { scale: 0.9, y: -100 }
  }

  const typeOfDialog = {
    delete: {
      color: 'red',
      variant: 'outlined'
    },
    new: {
      color: resumeColor || 'green',
      variant: 'filled'
    }
  }

  return (
    <>
      <Button
        color={color || typeOfDialog[type].color}
        size="sm"
        onClick={handleOpen}
        variant={variant || typeOfDialog[type].variant}>
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
