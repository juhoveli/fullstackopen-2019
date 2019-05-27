import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }

  return (
    <div style={style}>
    filter  <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { changeFilter })(Filter)