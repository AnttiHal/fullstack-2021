import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let id
const filterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        console.log(action.payload)
        state = action.payload
        return state
      },
      removeNotification(state, action) {
        return initialState
      }
    }
  })
  
  
  export const { createNotification, removeNotification } = filterSlice.actions
  
  export const handleNotification = (text, time) =>{
    
    return dispatch => {
        dispatch(createNotification(text))
        id = setTimeout(() => {
            dispatch(removeNotification())
        }, time*1000);
    }
  }
  
  export default filterSlice.reducer