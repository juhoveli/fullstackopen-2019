const notificationReducer = (state = {
  type: 'NONE'
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

export default notificationReducer