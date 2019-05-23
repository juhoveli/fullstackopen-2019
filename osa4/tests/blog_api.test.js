const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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
        url: "google",
        likes: 91
    }
]

beforeEach(async() => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned and are json', async () => {

  await api
   .get('/api/blogs')
   .expect(200)
   .expect('Content-Type', /application\/json/)
       
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})