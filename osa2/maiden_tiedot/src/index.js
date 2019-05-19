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
        <Countries countries={countriesToShow}/>
        </>
    )
}

const Countries = ({countries}) => {

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
        </div>
        )
    }

    if (countries.length <= 10) return (
        <div>
            {countries.map(c => <p key={c.alpha3Code}>{c.name}</p>)}
        </div>
    )


    return (
            <p>Too many matches, specify another filter</p>
        )
    


}

ReactDOM.render(<App />, document.getElementById('root'));
