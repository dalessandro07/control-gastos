const useAssignImg = () => {
  const API_KEY = '563492ad6f917000010000018978c9ab2b0d4e75b8ef9aca18e35b7c'

  const fetchPhotosFromApi = async (desc) => {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${desc}&per_page=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: API_KEY
      }
    })

    const data = await res.json()

    return data?.photos[0]?.src.small
  }

  const assignImg = async (desc) => {
    const newDescrip = desc.replace(/\s/g, '').toLowerCase()

    if (desc.includes('mercado')) {
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
