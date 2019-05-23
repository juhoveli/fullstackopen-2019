const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async() => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned and are json', async () => {

  await api
   .get('/api/blogs')
   .expect(200)
   .expect('Content-Type', /application\/json/)
       
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('id field is called id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()  
    });
})

test('new blog is added with right title', async () => {
    const newBlog = {
        title: "She",
        author: "Jane",
        url: "google",
        likes: 33
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(b => b.title)
      expect(contents).toContain('She')
})

test('undefined like is zero', async () => {
    const newBlog = {
        title: "She",
        author: "Jane",
        url: "google"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const addedBlog = await Blog.findOne({title: "She"})
    expect(addedBlog.likes).toBe(0)
})

test('deleting blog works if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

afterAll(() => {
  mongoose.connection.close()
})