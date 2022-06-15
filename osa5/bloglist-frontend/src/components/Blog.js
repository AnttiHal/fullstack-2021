import React, { useState } from 'react'

const Blog = ({ blog, handleLikechange, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDetails = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes}
          <button id='like-button' onClick={() => handleLikechange(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button id='delete-button' onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    )
  }


  return (
    <div>
      <div className='blog' style={style}>
        <div>
          {blog.title} {blog.author}
          <button id='show-button' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'hide':'show'}
          </button>
          {showAll && showDetails()}
        </div>
      </div>

    </div>

  )
}

export default Blog