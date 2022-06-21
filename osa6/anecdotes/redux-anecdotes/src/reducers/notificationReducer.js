import { createSlice } from '@reduxjs/toolkit'
const initialState = null
const filterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        state = action.payload
        return state
      },
      removeNotification(state, action) {
        return initialState
      }
    }
  })
  
  
  export const { createNotification, removeNotification } = filterSlice.actions
  export default filterSlice.reducer