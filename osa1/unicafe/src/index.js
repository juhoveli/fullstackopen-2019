import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
      <h1>statistiikka</h1>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)