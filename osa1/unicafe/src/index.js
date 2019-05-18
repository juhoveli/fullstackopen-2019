import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistic = ({stat, value, unit}) => {
    return (
        <p>{stat} {value}{unit}</p>
    )
}

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
    <Statistic stat="hyvä" value={props.good}/>
    <Statistic stat="neutraali" value={props.neutral}/>
    <Statistic stat="huono" value={props.bad}/>
    <Statistic stat="yhteensä" value={props.total}/>
    <Statistic stat="keskiarvo" value={props.avg}/>
    <Statistic stat="positiivisia" value={props.pos} unit="%"/>
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
      <Button handleClick={() => setGood(good +1)} text="hyvä" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutraali"/>
      <Button handleClick={() => setBad(bad+1)} text="huono"/>
      <Statistics good={good} bad={bad} neutral={neutral} 
      total={total} avg={avg} pos={pos}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)