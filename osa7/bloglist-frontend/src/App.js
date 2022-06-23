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
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, removeNotification, } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, like, removeBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [variant, setVariant] = useState('success')



  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const arrayForSort = [...blogs]

  useEffect(() => {
    dispatch(initializeBlogs())
    //blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    try{
      dispatch(createBlog(blogObject))
      setVariant('success')
      dispatch(createNotification(`New blog added! Name: ${blogObject.title}, author: ${blogObject.author}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } catch (e) {
      setVariant('danger')
      dispatch(createNotification('Fill all the fields.'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      console.log(e)
    }



    //setBlogs(blogs.concat(returnedBlog))


  }

  const handleLikechange = async (blog) => {
    dispatch(like(blog))
  }

  const handleDelete = async (blog) => {
    console.log(blog.id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(createNotification('Successfully logged out. Happy day!'))
    setTimeout(() => {
      dispatch(removeNotification())
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
      dispatch(createNotification(`welcome ${user.name}`))
      setVariant('success')
      setTimeout(() => {
        dispatch(removeNotification())
      }, 4000)
    } catch (exception) {
      setVariant('danger')
      dispatch(createNotification('wrong credentials'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const Login = () => {
    return (
      <div>
        <Notification variant={variant}/>

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
        <Notification variant={variant}/>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
        </p>
        <Togglable buttonLabel="create">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <Table striped>
          <tbody>
            {arrayForSort.sort((a, b) => a.likes > b.likes) &&
        arrayForSort.map((blog) => (
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
