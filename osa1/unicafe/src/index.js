import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, bad, neutral}) => {

    const total = good+bad+neutral
    const avg = (good + bad * -1) / total
    const pos = (good / total) * 100

    return (
        <>
        <h1>statistiikka</h1>
        <p>hyvä {good}</p>
        <p>neutraali {neutral}</p>
        <p>huono {bad}</p>
        <p>yhteensä {total}</p>
        <p>keskiarvo {avg}</p>
        <p>positiivisia {pos}%</p>
        </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <button onClick={() => setGood(good +1)} >hyvä</button>
      <button onClick={() => setNeutral(neutral+1)}>neutraali </button>
      <button onClick={() => setBad(bad+1)}>huono</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)