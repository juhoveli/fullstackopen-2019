import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {
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
      {props.visibleAnecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1).map(anecdote =>
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

const anecdotesToShow = (props) => {
  const anecdotesFilter =
  props.anecdotes
    .filter(
      a => a.content.toLowerCase().includes(
        props.filter
      )
    )
  return props.filter ? anecdotesFilter : props.anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  notificationChange, voteAnecdote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList