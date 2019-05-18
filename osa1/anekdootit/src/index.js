import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
  const [best, setBest] = useState(0)

  const min = 0
  const max = anecdotes.length -1
  const random = Math.floor(Math.random() * (max-min+1)) + min

  const addVote = (index) => {
      const copy = { ...votes}
      copy[index] += 1
      setVotes(copy)
      setBest(getBest)
  }

  const getBest = () => {
    let best = 0
    for (let i = 1; i < anecdotes.length; i++) {
        if (votes[i] > votes[best]) best = i
    }
    return best
  }


  return (
    <div>
        <h2>Anecdote of the day</h2>
          {anecdotes[selected]}
          <p>has {votes[selected]} votes</p>
          <button onClick={() => addVote(selected)}>vote</button>
          <button onClick={() => setSelected(random)}>next anecdote</button>
        <h2>Anecdote with most votes</h2>
        {anecdotes[best]}
          <p>has {votes[best]} votes</p>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)