import { useState } from 'react'

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const useAssignImg = () => {
  const [nroImagen, setNroImagen] = useState(0)

  const recoverData = (data) => {
    console.log(data)
    console.log(nroImagen)
  }

  const fetchPhotosFromApi = async (desc) => {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${desc}&per_page=10`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: API_KEY
      }
    })

    const data = await res.json()

    recoverData(data)
    return data?.photos[nroImagen]?.src.small
  }

  const assignImg = async (desc) => {
    const newDescrip = desc.toLowerCase()

    if (desc.toLowerCase().includes('mercado')) {
      return 'https://plazavea.vteximg.com.br/arquivos/ids/628808-450-450/image-eb60a9a8c5e141a3a259656bcf18efb5.jpg'
    } else {
      return await fetchPhotosFromApi(newDescrip)
    }
  }

  const aumentarNroImagen = () => {
    const num = nroImagen < 10 ? nroImagen + 1 : 0
    setNroImagen(num)
  }

  return {
    assignImg,
    aumentarNroImagen
  }
}

export default useAssignImg
