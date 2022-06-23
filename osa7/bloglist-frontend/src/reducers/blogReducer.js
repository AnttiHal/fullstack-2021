import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      console.log('actiondata: '+JSON.stringify(action.payload))
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
  deleteBlog(state, action) {
    return state.filter((blog) => blog.id !== String(action.data))
  }
})

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const like = (id) => {
  return async dispatch => {
    console.log(id)
    const blogToUpdate = await blogService.like(id)
    dispatch(likeBlog(blogToUpdate))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    console.log(id)
    const blogToUpdate = await blogService.remove(id)
    dispatch(likeBlog(blogToUpdate))
  }
}




export const {  likeBlog,appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer