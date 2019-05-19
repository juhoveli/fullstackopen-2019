import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          console.log('prom full')
          setPersons(response.data)
          setPersonsToShow(response.data)
      })
}, [])
console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //todo: yksi merkki jäljessä
  const updateFilter = () => {
    setPersonsToShow(persons.filter( p =>
        p.name.toUpperCase().includes(newFilter.toUpperCase())))
  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
      updateFilter() 
  }

  const addPerson = (event) => {
      event.preventDefault()
      const personObject = { name: newName, number: newNumber}
      if (persons.find(person => person.name === newName)) {
         alert(`${newName} on jo luettelossa`)
      }
      else {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
      }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>lisää uusi</h2>
        <PersonForm addPerson={addPerson}
                        newName={newName}
                        newNumber={newNumber}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>
       <h2>Numerot</h2>  
       <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App