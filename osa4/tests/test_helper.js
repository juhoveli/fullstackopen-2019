const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "You",
      author: "Don",
      url: "localhost",
      likes: 100
    },
    {
        title: "Me",
        author: "Jon",
        url: "google"
    }
]

const initialUsers = [
    {
      name: "Juhani Jokunen",
      username: "juhani",
      password: "juhani"
    },
    {
      name: "Jokuni Juhanen",
      username: "jokuni",
      password: "jokuni"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}