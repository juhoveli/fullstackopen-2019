import React from 'react'

const Persons = ({personsToShow, removePerson}) => {
    return (
        <table>
            <tbody>
        {personsToShow.map(p => <tr key={p.name}><td>{p.name}</td><td>{p.number}</td><td><button onClick={() => removePerson(p.id)}>poista</button></td></tr>)}
            </tbody>
        </table>
    )
}

export default Persons