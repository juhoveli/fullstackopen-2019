import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.type === 'NONE') return null

  return (
    <div className={notification.data.type}>
      {notification.data.message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification