import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
    

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        props.createAnecdote(content)
        props.handleNotification(`You created new anecdote: ${content}`, 5)
        
      }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
      
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      notification: state.notification
    }
  }

  const mapDispatchToProps = {
    createAnecdote,
    handleNotification
  }
  
  const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
  export default ConnectedAnecdoteForm

