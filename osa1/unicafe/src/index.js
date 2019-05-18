import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  if (props.total === 0) 
    return (
        <>
        <h1>statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
        </>
      )

  return (
    <>
    <h1>statistiikka</h1>
    <p>hyvä {props.good}</p>
    <p>neutraali {props.neutral}</p>
    <p>huono {props.bad}</p>
    <p>yhteensä {props.total}</p>
    <p>keskiarvo {props.avg}</p>
    <p>positiivisia {props.pos}%</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+bad+neutral
  const avg = (good + bad * -1) / total
  const pos = (good / total) * 100

  return (
    <div>
      <h1>anna palautetta</h1>
      <button onClick={() => setGood(good +1)} >hyvä</button>
      <button onClick={() => setNeutral(neutral+1)}>neutraali </button>
      <button onClick={() => setBad(bad+1)}>huono</button>
      <Statistics good={good} bad={bad} neutral={neutral} 
      total={total} avg={avg} pos={pos}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)