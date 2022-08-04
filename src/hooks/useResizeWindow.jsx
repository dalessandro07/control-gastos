import { useState, useEffect } from 'react'

const useResizeWindow = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = width < 680

  return { width, isMobile }
}

export default useResizeWindow
