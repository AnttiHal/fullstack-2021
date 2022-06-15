import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create new</h2>
      </div>
      <div>
          title:
        <input
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='write title'
        />
      </div>
      <div>
          author:
        <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write author'
        />
      </div>
      <div>
          url:
        <input
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='write url'
        />
      </div>
      <button id='create-blog-button' type="submit">create</button>
    </form>

  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired

}

export default BlogForm