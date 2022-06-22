import { useSelector, useDispatch } from 'react-redux'
import { orderBy } from "lodash";
import { vote } from '../reducers/anecdoteReducer'

import  {handleNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    const dispatch = useDispatch()
    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);
    const filter = useSelector(state => state.filter)
    const FilteredAnecdotes = sortedAnecdotes.filter((a) => a.content.includes(filter))

    const voteAnecdote = (anecdote) => {    
        console.log('vote', anecdote.id)
        dispatch(vote(anecdote.id))
        //dispatch(createNotification(`You voted: ${anecdote.content}`,5000))
        dispatch(handleNotification(`You voted: ${anecdote.content}`,5))
        //setTimeout(() => {
        //    dispatch(removeNotification())
        //  }, 5000);
      }
    return (
      <div>
        
        {FilteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} 
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>  
      
    )
}



export default AnecdoteList