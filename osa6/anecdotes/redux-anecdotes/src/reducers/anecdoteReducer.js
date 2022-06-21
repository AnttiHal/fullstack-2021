import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
     console.log('actiondata: '+action.payload.data.content)
      return state.map((anecdote) =>
        anecdote.id === action.payload.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.updateAnecdote(id)
    dispatch(voteAnecdote(anecdoteToUpdate))
  }
}


export const {  voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer