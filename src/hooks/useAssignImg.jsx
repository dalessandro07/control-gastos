const API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const useAssignImg = () => {
  const fetchPhotosFromApi = async (desc) => {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${desc}&per_page=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: API_KEY
      }
    })

    const data = await res.json()
    return data?.photos[0]?.src?.small
  }

  const assignImg = async (desc) => {
    const newDescrip = desc.toLowerCase()

    if (desc?.toLowerCase().includes('mercado')) {
      return 'https://plazavea.vteximg.com.br/arquivos/ids/628808-450-450/image-eb60a9a8c5e141a3a259656bcf18efb5.jpg'
    } else {
      return await fetchPhotosFromApi(newDescrip)
    }
  }

  return {
    assignImg
  }
}

export default useAssignImg
