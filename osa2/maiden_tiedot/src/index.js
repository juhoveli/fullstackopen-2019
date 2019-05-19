import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState(countries)

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
            setCountriesToShow(response.data)
        })
    }, [])

    const handleFilterChange = (event) => {
        let filter = event.target.value
        setCountriesToShow(countries.filter(c =>
            c.name.toUpperCase().includes(filter.toUpperCase())))
      }

    return (
        <>
        <div>find countries<input onChange={handleFilterChange}/></div>
        <Countries countries={countriesToShow} />
        </>
    )
}

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(
        {current: {
            temp_c: -99,
            wind_kph: -99,
            wind_dir: -99,
            condition: {
                icon: -99
            }
        }}
    )
    let city = capital
    useEffect(() => {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=ec0c94b8bf5249e8ba0120417191905&q=${city}`)
        .then(response => {
            setWeather(response.data)
        })
    }, [])

    return (
        <div>
        <h3>Weather in {city}</h3>
        <p><b>temperature: </b>{weather.current.temp_c}</p>
        <img src={weather.current.condition.icon} alt="weather"></img>
        <p><b>wind: </b>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
        </div>
    )
}

const Countries = ({countries}) => {

    const handleClick = (event) => {
        console.log(event.currentTarget.value)
        let c = countries.find(co => co.name === event.currentTarget.value)
        console.log(c)
        let imgSize = '50px'
        return (
        <div>
            <h2>{c.name}</h2>
            <p>capital {c.capital}</p>
            <p>population {c.population}</p>
            <h3>languages</h3>
            <ul>
                {c.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
            </ul>
            <img src={c.flag} alt="flag of country" height={imgSize}></img>
            <Weather capital={c.capital}/>
        </div>
        )
    }

    if (countries.length === 1) {
        let c = countries[0]
        let imgSize = '50px'
        return (
        <div>
            <h2>{c.name}</h2>
            <p>capital {c.capital}</p>
            <p>population {c.population}</p>
            <h3>languages</h3>
            <ul>
                {c.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
            </ul>
            <img src={c.flag} alt="flag of country" height={imgSize}></img>
            <Weather capital={c.capital}/>
        </div>
        )
    }

    if (countries.length <= 10) return (
        <div>
            {countries.map(c => <p key={c.alpha3Code}>{c.name}<button value={c.name} onClick={handleClick}>show</button></p>)}
        </div>
    )


    return (
            <p>Too many matches, specify another filter</p>
        )
    


}

ReactDOM.render(<App />, document.getElementById('root'));
