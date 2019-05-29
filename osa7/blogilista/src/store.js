import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import blogService from './services/blogs'

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer
})

const store = createStore(reducer)

blogService.getAll().then(blogs =>
  blogs.forEach(blog => {
    store.dispatch({ type: 'NEW', data: blog })
  })
)

export default store