const APIKEY = import.meta.env.VITE_RAPIDAPI
const HOST = import.meta.env.VITE_RAPIDAPI_HOST

const useTranslate = () => {
  const fetchTranslate = async (options, lang) => {
    const res = await fetch(
      `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${lang}&api-version=3.0&profanityAction=NoAction&textType=plain`,
      options
    )

    const data = await res.json()

    return data[0].translations[0].text
  }

  const translateWord = async (desc, lang) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': HOST,
        'X-RapidAPI-Key': APIKEY
      },
      body: `[{"Text":"${desc}"}]`
    }

    return fetchTranslate(options, lang)
  }

  return {
    translateWord
  }
}

export default useTranslate
