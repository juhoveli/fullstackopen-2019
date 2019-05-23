const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}