import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      content: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content: anecdotes
    })
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT': {
    return action.content
  }
  case 'VOTE': {
    const id = action.id
    const anecdoteToVote = state.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    return state.map(a => a.id !== id ? a : votedAnecdote)
  }
  case 'NEW':
    return [...state, action.content]
  default: return state
  }
}

export default anecdoteReducer