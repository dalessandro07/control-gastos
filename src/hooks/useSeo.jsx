import { useEffect, useRef } from 'react'

const useSeo = ({ description, title }) => {
  const prevTitle = useRef(document.title)
  const prevDescription = useRef(document.querySelector('meta[name="description"]'))

  useEffect(() => {
    const previousTitle = prevTitle.current

    if (title) {
      document.title = `${title} | Allexpenses`
    }

    return () => (document.title = previousTitle)
  }, [title])

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = prevDescription.current

    if (description) {
      metaDescription.setAttribute('content', description)
    }

    return () => metaDescription.setAttribute('content', previousDescription)
  }, [description])
}

export default useSeo
