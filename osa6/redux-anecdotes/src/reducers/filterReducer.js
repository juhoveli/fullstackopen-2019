const filterReducer = (state = null, action) => {
  switch (action.type) {
  case 'FILTERED':
    return action.filter
  default: return state
  }
}

export const changeFilter = filter => {
  return {
    type: 'FILTERED',
    filter
  }
}

export default filterReducer