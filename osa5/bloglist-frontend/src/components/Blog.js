import React, {useState} from "react"

const Blog = ({blog, handleLikechange}) => {
 const [showAll, setShowAll] = useState(false)
 
 const hideWhenVisible = { 
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showAll ? 'none' : '' 
}
 const showWhenVisible = { 
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showAll ? '' : 'none' 
}
 return (
  <div>
    <div style={hideWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(true)}>show</button>
        </p>
    </div>
    <div style={showWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>{blog.likes} 
        <button onClick={() =>handleLikechange(blog.id, blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        
    </div>
  </div>
   
)
}

export default Blog