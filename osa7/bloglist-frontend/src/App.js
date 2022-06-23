import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  Routes, Route
} from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(null)
  const [variant, setVariant] = useState('success')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [reload])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setVariant('success')
      setErrorMessage(
        `New blog added! Name: ${returnedBlog.title}, author: ${returnedBlog.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }).catch((err) => {
      setVariant('danger')
      setErrorMessage('You have to fill all the fields.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(err)
    })
  }

  const handleLikechange = async (blog) => {
    await blogService.like({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
    setReload(reload + 1)
  }

  const handleDelete = async (blog) => {
    console.log(blog.id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setReload(reload + 1)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage('Successfully logged out. Happy day!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setVariant('success')
      setErrorMessage(`welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } catch (exception) {
      setVariant('danger')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Login = () => {
    return (
      <div>
        <Notification message={errorMessage} variant={variant}/>

        <h2>Login to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password</Form.Label>

            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />

            <Button id="login-button" type="submit">
            login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const Frontpage = () => {
    return (
      <div className='d-grid gap-3'>
        <Notification message={errorMessage} variant={variant}/>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
        </p>
        <Togglable buttonLabel="create">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <Table striped>
          <tbody>
            {blogs.sort((a, b) => a.likes > b.likes) &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikechange={handleLikechange}
            handleDelete={handleDelete}
          />
        ))}
          </tbody>
        </Table>
      </div>
    )
  }

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Frontpage />} />
  </Routes>
  if (user === null) {
    return (
      <div className='container'>
        <Login />
      </div>
    )
  }
  return (
    <div className='container'>
      <Frontpage />
    </div>
  )
}

export default App