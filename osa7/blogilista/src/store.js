import { createStore, combineReducers } from 'redux'

const notificationReducer = (state = {
  type: 'NONE',
  data: {
    type: 'success',
    message: 'NOTIFIKAATIO',
  }
}, action) => {
  switch (action.type) {
  case 'SUCCESS':
    return action
  case 'ERROR':
    return action
  case 'NONE':
    return action
  default:
    return state
  }
}

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer)

export default store