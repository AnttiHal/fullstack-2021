import { createSlice } from '@reduxjs/toolkit'
const initialState = 'this is initial notification'
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        const content = action.payload
        return state
      }
    }
  })
  
  
  export const { createNotification } = notificationSlice.actions
  export default notificationSlice.reducer