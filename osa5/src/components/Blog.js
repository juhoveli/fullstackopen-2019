import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [blogShowDetails, setBlogShowDetails] = useState(false)

  const noDetails = { display: blogShowDetails? 'none' : '' }
  const allDetails = { display: blogShowDetails ? '' : 'none' }

  const addLike = async (event) => {
      event.preventDefault()

      const blogObject = {
        id: blog.id,
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      try {
        blogService.update(blog.id, blogObject)
        setBlogs(blogs.map(p => (p.id !== blog.id ? p : blogObject)))
      } catch (error) {
        //
      }

    }

  return (
  <div key={blog.id} className="blog">
    <p onClick={() => setBlogShowDetails(!blogShowDetails)}><b>{blog.title}</b> {blog.author}</p>
    <div style={noDetails}>
    </div>
    <div style={allDetails}>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={addLike}>like</button></p> 
      <p>added by {blog.user.name}</p>
    </div>
  </div>
)
}

export default Blog