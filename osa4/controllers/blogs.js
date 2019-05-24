const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1,name:1,id:1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (e) {
      next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        console.log(blog.user.toString())
        console.log(user.id.toString())
        if (blog.user.toString() !== user.id.toString()) {
            return response.status(401).json({error: 'user not owner of this blog'})
        }

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