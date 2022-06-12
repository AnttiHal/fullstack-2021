const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')



  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithManyBlogs) 
  })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
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
  
    expect(response.body).toHaveLength(helsper.listWithManyBlogs.length + 1)
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
  
    test('get code 400 when inserting blog without title and url', async () => {
        
        const newBlog = {
            author: "Michael Chan",
          }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
          
        
      })

    describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
    
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
        username: 'anthal',
        name: 'Antti Halmetoja',
        password: 'verysecret',
        }
    
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

afterAll(() => {
  mongoose.connection.close()
})