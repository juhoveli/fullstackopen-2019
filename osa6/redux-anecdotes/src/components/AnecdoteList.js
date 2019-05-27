import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes

  const anecdotesFilter =
    anecdotes
      .filter(
        a => a.content.includes(
          props.filter
        )
      )

  const anecdotesToShow = props.filter ? anecdotesFilter : anecdotes

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)

    props.notificationChange(anecdote.content)

    setTimeout(() => {
      props.notificationChange(null)
    }, 3000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter  />
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  notificationChange, voteAnecdote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList