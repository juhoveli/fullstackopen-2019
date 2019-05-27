import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = ({ store }) => {

  const anecdotes = store.getState().anecdotes

  const anecdotesFilter =
    anecdotes
      .filter(
        a => a.content.includes(
          store.getState().filter
        )
      )

  const anecdotesToShow = store.getState().filter ? anecdotesFilter : anecdotes

  const vote = (anecdote) => {
    store.dispatch(
      voteAnecdote(anecdote.id)
    )
    store.dispatch(
      notificationChange(anecdote.content)
    )
    setTimeout(() => {
      store.dispatch(notificationChange(null))
    }, 3000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter store={store} />
      {anecdotesToShow.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
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