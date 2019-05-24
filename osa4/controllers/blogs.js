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
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch (e) {
      next(e)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch (exception) {
        next(exception)
      }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
        response.status(201).end()
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter