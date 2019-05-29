import React from 'react'

const SingleBlog = ({ blog }) => {
  if ( blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default SingleBlog