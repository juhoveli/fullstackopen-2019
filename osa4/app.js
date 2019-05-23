
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

console.log('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
.then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(cors())


module.exports = app