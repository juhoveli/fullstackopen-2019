import React, {useState} from 'react'
import blogService from '../services/blogs'

const NewBlogForm = (props) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addNewBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl
        }
    
        try {
            const returnedBlog = await blogService.create(blogObject)
            props.setBlogs(props.blogs.concat(returnedBlog))
            setNewBlogTitle('') 
            setNewBlogAuthor('')
            setNewBlogUrl('')
            props.setNotification(
                {message: `${returnedBlog.title} added`,
              type: "success"}
              )
              setTimeout(() => {
                props.setNotification({message: null, type: null})
              }, 5000)
        } catch (exception) {
            props.setNotification(
                {message: "adding a blog failed",
                type: "failure"}
              )
              setTimeout(() => {
                props.setNotification({message: null, type: null})
              }, 5000)
        }

      }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title 
          <input
            type="text"
            value={props.newBlogTitle}
            name="Title"
            onChange={({target}) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={props.newBlogAuthor}
            name="Author"
            onChange={({target}) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={props.newBlogUrl}
            name="Url"
            onChange={({target}) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button> 
      </form>
    </>
  )
}

export default NewBlogForm