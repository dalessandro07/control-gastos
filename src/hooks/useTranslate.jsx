const APIKEY = import.meta.env.VITE_RAPIDAPI

const useTranslate = () => {
  const fetchTranslate = async (options) => {
    const res = await fetch(
      'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=en&api-version=3.0&profanityAction=NoAction&textType=plain',
      options
    )

    const data = await res.json()

    return data[0].translations[0].text
  }

  const translateWord = async (desc) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
        'X-RapidAPI-Key': APIKEY
      },
      body: `[{"Text":"${desc}"}]`
    }

    return fetchTranslate(options)
  }

  return {
    translateWord
  }
}

export default useTranslate
