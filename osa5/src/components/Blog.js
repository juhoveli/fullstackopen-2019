import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [blogShowDetails, setBlogShowDetails] = useState(false)

  const noDetails = { display: blogShowDetails? 'none' : '' }
  const allDetails = { display: blogShowDetails ? '' : 'none' }

  return (
  <div className="blog">
    <p onClick={() => setBlogShowDetails(!blogShowDetails)}><b>{blog.title}</b> {blog.author}</p>
    <div style={noDetails}>
    </div>
    <div style={allDetails}>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button>like</button></p> 
      <p>added by {blog.user.name}</p>
    </div>
  </div>
)
}

export default Blog