import React from 'react'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    store.dispatch(
      changeFilter(event.target.value)
    )
  }

  console.log(store.getState().filter)
  return (
    <div style={style}>
    filter  <input onChange={handleChange} />
    </div>
  )
}

export default Filter