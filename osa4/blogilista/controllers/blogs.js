const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}) 
  response.json(blogs)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.title && !body.url) {
      response.status(400).send('Bad request!')
    } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
  
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }})

  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
  
  })



  module.exports = blogsRouter