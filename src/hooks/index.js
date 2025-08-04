import  { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"

  const fetchCountry = async () => {
    const countryInfos = await axios
                          .get(`${baseUrl}${name}`)
                          .catch(error => ({'status': error.status}))
    
    countryInfos.status === 200
    ? setCountry({
        found: true,
        data: countryInfos.data
      })
    : setCountry({ found: false })
  }

  useEffect(() => {
    name && fetchCountry()
  }, [name])

  return country
}