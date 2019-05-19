import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
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

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
            numero: <input
                      value={newNumber}
                      onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <table>
           <tbody>      
            {persons.map(p => <tr key={p.name}><td>{p.name}</td><td>{p.number}</td></tr>)}
           </tbody>
      </table>
    </div>
  )

}

export default App