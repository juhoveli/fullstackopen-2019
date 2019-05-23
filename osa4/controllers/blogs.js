const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0

  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter