const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject
    for (let i=0;i<initialBlogs.length;i++) {
        blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
    
    
  })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('React patterns')
  })

  test('when adding blog with empty likes-field, returns 0 likes', async () => {
    await Blog.deleteMany({})
    const newBlog = {
        title: "Test author",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const blogs = response.body
    
    expect(blogs[0].likes).toBe(0)
    
  })

  
    test('deletion succeeds with status code 204 if id is valid', async () => {
        const response = await api.get('/api/blogs')
        const list = response.body
        
        blogToDeleteId = list[0].id
        
      await api
        .delete(`/api/blogs/${blogToDeleteId}`)
        .expect(204)

        const response2 = await api.get('/api/blogs')
        const list2 = response2.body
      expect(list2).toHaveLength(5)

      //const contents = notesAtEnd.map(r => r.content)

      //expect(contents).not.toContain(noteToDelete.content)
    })

    test('updating succeeds', async () => {
        const newBlog = {
            title: "Elämäni presidenttinä",
            author: "Sauli Niinistö",
            url: "suomi.fi",
            likes: 1
          }

        const response = await api.get('/api/blogs')
        const list = response.body
        
        blogToBeUpdatedId = list[0].id
        
      await api
        .put(`/api/blogs/${blogToBeUpdatedId}`)
        .send(newBlog)
        

        const response2 = await api.get('/api/blogs')
        const list2 = response2.body
        const updatedBlog = list2[0]
      expect(updatedBlog.author).toBe("Sauli Niinistö")

      //const contents = notesAtEnd.map(r => r.content)

      //expect(contents).not.toContain(noteToDelete.content)
    })
  


afterAll(() => {
  mongoose.connection.close()
})