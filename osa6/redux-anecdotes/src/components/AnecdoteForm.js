import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const add = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    event.target.anecdote.value = ''
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={add}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)


