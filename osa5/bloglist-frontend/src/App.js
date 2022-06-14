import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(null)
  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    
    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`New blog added! Name: ${returnedBlog.title}, author: ${returnedBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    })
  }

  const handleLikechange = async (blog) => {
    await blogService.like({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      

    })
    setReload(reload+1)
  }

  const handleDelete = async (blog) => {
    console.log(blog.id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
    setReload(reload+1)
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
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  if (user === null) {
  return (
    <div>
      <Notification message={errorMessage} />
      
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      
    </div>
  )
      } 
      return (
        <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel='create'>
        <BlogForm createBlog={addBlog}/>
    </Togglable>
      {blogs.sort((a,b) => (a.likes>b.likes)) && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikechange={handleLikechange} handleDelete={handleDelete}/>
      )}
    </div>
      )
}

export default App
