import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import store from './store'
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
      store.dispatch({
        type: 'SUCCESS',
        data: {
          type: 'success',
          message: 'successful login',
        }
      })
      setTimeout(() => store.dispatch({
        type: 'NONE',
      }), 5000)
    } catch (error) {
      setPassword('')
      store.dispatch({
        type: 'ERROR',
        data: {
          type: 'failure',
          message: error.response.data.error,
        }
      })
      setTimeout(() => store.dispatch({
        type: 'NONE',
      }), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    store.dispatch({
      type: 'SUCCESS',
      data: {
        type: 'success',
        message: 'logged out!',
      }
    })
    setTimeout(() => store.dispatch({
      type: 'NONE'
    }), 5000)
  }

  if (user === null) {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div className='notLogged'>
        <Notification notification={store.getState().notification} />
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
    <div className='loggedIn'>
      <Notification notification={store.getState().notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <NewBlogForm
        blogs={blogs}
        setBlogs={setBlogs}
      />
      <h2>all</h2>
      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)


export default App