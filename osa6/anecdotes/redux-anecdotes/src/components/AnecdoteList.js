import { useSelector, useDispatch } from 'react-redux'
import { orderBy } from "lodash";
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    const dispatch = useDispatch()
    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>  
      
    )
}

export default AnecdoteList