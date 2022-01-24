import React, {useState, useEffect} from 'react'
import axios from 'axios'



const SelectedCountry = ({country}) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => { 
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
      }
    console.log('weathereffect')
    axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
      console.log(response.data)
      console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`)
      setWeather(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [country.capital])
  
  console.log(weather )

  if (weather===null) {
    return null
  }
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      {country.languages.map(lang => 
      <p key={lang.name}>{lang.name}</p>)}
      <img src={country.flag} alt='' width='300px'/>
      <h2>Weather in {country.capital}</h2>
      <p><strong>Temperature: </strong> {weather.current.temperature}℃</p>
      <img src={weather.current.weather_icons[0]} alt='weather_icon' width='50px'/>
      <p><strong>Wind: </strong> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
    </>
  )
}

const FilterResults = ({countriesToShow, setCountriesToShow}) => {
  
  
  if (countriesToShow.length>10){
    return (
      'Too many matches, specify more'
    )
  } else if (countriesToShow.length===1) {
  return (
     <SelectedCountry country={countriesToShow[0]}/>
  )} else if (countriesToShow.length<10) {
    return (
      countriesToShow.map(country => {
        return (
          
        <div key={country.name}>
          {country.name}  &nbsp;
          <button onClick={() => setCountriesToShow([country])}>              
          show
          </button>         
        </div>
      )})
    )
  } 
  return (
    'No results'
  )
}




const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      console.log(response.data)
  })
  }, [])
  console.log('render', countries.length, 'countries')
  console.log('countriesToShow: ', countriesToShow.length)

  const handleInputChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
    setCountriesToShow(countries.filter(country => (country.name.toLowerCase()).includes(event.target.value.toLowerCase())))
  }

  

  return (
  <div>
    <h1>Welcome to country finder</h1>
    find countries &nbsp;
    <input value={text} onChange={handleInputChange}></input>
    <FilterResults countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>  
  </div>
)
}

export default App