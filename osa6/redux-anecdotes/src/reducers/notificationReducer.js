const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.id
  default: return state
  }
}

export const notificationChange = id => {
  return {
    type: 'SET_NOTIFICATION',
    id
  }
}


export default notificationReducer