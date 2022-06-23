import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    /*voteAnecdote(state, action) {
      console.log('actiondata: '+action.payload.data.content)
      return state.map((anecdote) =>
        anecdote.id === action.payload.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },*/
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      console.log(action.data)
      return action.payload
    }
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
    console.log('this is called')
    dispatch(setBlogs(blogs))
  }
}




export const {  appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer