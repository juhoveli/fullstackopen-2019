import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
          setPersons(response.data)
          setPersonsToShow(response.data)
      })
}, [])

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
        if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          const person = persons.find(person => person.name === newName)
          const newPersonObject = {...person, number: newNumber}
          
          personService
          .update(person.id, newPersonObject)
          .then(response => {
            setPersons(persons.map(p => (p.id !== person.id ? p : response.data)))
            setPersonsToShow(persons.map(p => (p.id !== person.id ? p : response.data)))
            setNewName('')
            setNewNumber('')
          })
        }
      }
      else {
          personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setPersonsToShow(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const removePerson = id => {
    const personToRemove = persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${personToRemove.name}`)) {
    personService
      .remove(personToRemove.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setPersonsToShow(persons.filter(p => p.id !== id))
      })
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
       <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App