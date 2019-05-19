import React from 'react'

const Persons = ({personsToShow}) => {
    return (
        <table>
            <tbody>
        {personsToShow.map(p => <tr key={p.name}><td>{p.name}</td><td>{p.number}</td></tr>)}
            </tbody>
        </table>
    )
}

export default Persons