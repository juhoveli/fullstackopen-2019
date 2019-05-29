import React from 'react'

const User = ({ user }) => {
  if ( user === undefined) {
    return null
  }
  console.log(user)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User