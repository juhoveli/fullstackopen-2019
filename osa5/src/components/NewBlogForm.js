import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const NewBlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.toInput.value,
      author: author.toInput.value,
      url: url.toInput.value
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      props.setBlogs(props.blogs.concat(returnedBlog))
      title.reset()
      author.reset()
      url.reset()
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
          <input {...title.toInput} />
        </div>
        <div>
          author
          <input {...author.toInput} />
        </div>
        <div>
          url
          <input {...url.toInput} />
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