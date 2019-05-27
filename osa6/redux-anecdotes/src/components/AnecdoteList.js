import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {

  const anecdotes = store.getState().anecdotes

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    store.dispatch(
      voteAnecdote(anecdote.id)
    )
    store.dispatch(
      notificationChange(anecdote.content)
      //timeout 3 sek ==> null
    )
    setTimeout(() => {
      store.dispatch(notificationChange(null))
    }, 3000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}



export default AnecdoteList