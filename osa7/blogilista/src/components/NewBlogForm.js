import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import propTypes from 'prop-types'
import store from '../store'

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
      store.dispatch({
        type: 'SUCCESS',
        data: {
          type: 'success',
          message: `${returnedBlog.title} added`,
        }
      })
      setTimeout(() => store.dispatch({
        type: 'NONE'
      }), 5000)
    } catch (exception) {
      store.dispatch({
        type: 'ERROR',
        data: {
          type: 'failure',
          message: exception.response.data.error,
        }
      })
      setTimeout(() => store.dispatch({
        type: 'NONE',
      }), 5000)
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
}

export default NewBlogForm