const useTranslate = () => {
  const fetchTranslate = async (options) => {
    const res = await fetch(
      'https://google-translate1.p.rapidapi.com/language/translate/v2',
      options
    )

    const data = await res.json()

    return data.data.translations[0].translatedText
  }

  const translateWord = async (word) => {
    const encodedParams = new URLSearchParams()
    encodedParams.append('q', word)
    encodedParams.append('source', 'es')
    encodedParams.append('target', 'en')

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e1b156995emsh327f99e96211d13p1213c7jsnd4b61547cfd3'
      },
      body: encodedParams
    }

    return fetchTranslate(options)
  }

  return {
    translateWord
  }
}

export default useTranslate
