import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, handleLikechange, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)



  const showDetails = () => {
    return (
      <div className='d-grid gap-3'>
        <p><b>Visit: </b><a href={blog.url}>{blog.url}</a></p>
        <p>
          Blog has {blog.likes} likes&nbsp; &nbsp; &nbsp;
          <Button id="like-button" onClick={() => handleLikechange(blog)}>
            like
          </Button>
        </p>
        <p><b>Owner of the blog: </b>{blog.user.name}</p>
        <Button id="delete-button" onClick={() => handleDelete(blog)}>
          Delete
        </Button>
      </div>
    )
  }

  return (
    <tr>
      <td>
        <b>{blog.title}</b> by <b>{blog.author}</b>&nbsp; &nbsp; &nbsp;&nbsp;
        <Button id="show-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'show'}
        </Button>
        {showAll && showDetails()}
      </td>
    </tr>
  )
}

export default Blog
