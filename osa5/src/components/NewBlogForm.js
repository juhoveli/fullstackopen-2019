import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const NewBlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  console.log(title, author, url)

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      props.setBlogs(props.blogs.concat(returnedBlog))
      //setNewBlogTitle('')
      //setNewBlogAuthor('')
      //setNewBlogUrl('')
      props.setNotification(
        { message: `${returnedBlog.title} added`,
          type: 'success' }
      )
      setTimeout(() => {
        props.setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      props.setNotification(
        { message: 'adding a blog failed',
          type: 'failure' }
      )
      setTimeout(() => {
        props.setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

NewBlogForm.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func.isRequired,
  setNotification: propTypes.func.isRequired
}

export default NewBlogForm