import React, {useState, useEffect} from 'react'
import axios from 'axios'



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

  const handleInputChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
    
    setCountriesToShow(countries.filter(country => (country.name.toLowerCase()).includes(event.target.value.toLowerCase())))
  }

  const filteredCountries = countriesToShow.length>10 ? 'Too many matches, specify more': countriesToShow
  return (
  <div>
    <p>find countries
    <input value={text} onChange={handleInputChange}></input>
    </p>
      
      {countriesToShow.length>10 ? 'Too many matches, specify more': 
      countriesToShow.length===1 ? countriesToShow.map(country => 
      <li key={country.altSpellings[0]}>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => 
          <li>{lang.name}</li>)}
      </ul>  
      <img src={country.flag} alt='' width='300px'/>
    </li>
      ): countriesToShow.length<10 ? countriesToShow.map(country => 
        <li key={country.altSpellings[0]}>
          {country.name}
          <button>
            show
          </button>
        </li> ) : 'No results'}
    
  </div>
)
}

export default App