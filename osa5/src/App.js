import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, type: null})
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(
        {message: `successful login`,
        type: "success"}
      )
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    } catch (error) {
      setPassword('')
      setNotification(
          {message: error.response.data.error,
          type: "failure"}
        )
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotification(
      {message: `logged out`,
      type: "success"}
    )
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  }

  if (user === null) {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <Notification message={notification.message} type={notification.type}/>
        <div style={hideWhenVisible}>
          <h2>log in to application</h2>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            handleLogin={handleLogin}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}/>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
    
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type}/>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <NewBlogForm 
        blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}
      />
      <h2>all</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )
}


export default App