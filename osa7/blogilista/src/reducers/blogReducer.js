
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW':
    return state.concat(action.data)
  default: return state
  }
}

export default blogReducer