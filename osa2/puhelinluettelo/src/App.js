import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
      event.preventDefault()
      const personObject = { name: newName}
      if (persons.find(person => person.name === newName)) {
         alert(`${newName} on jo luettelossa`)
      }
      else {
          setPersons(persons.concat(personObject))
          setNewName('')
      }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <table>
           <tbody>      
            {persons.map(p => <tr key={p.name}><td>{p.name}</td></tr>)}
           </tbody>
      </table>
    </div>
  )

}

export default App