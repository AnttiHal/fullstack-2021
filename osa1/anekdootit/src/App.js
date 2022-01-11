import React, { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  })
  const [maximumVotes, setMaximumVotes] = useState(0)
  const [maximumAnecdote, setMaximumAnecdote] = useState(anecdotes[0])

  
  const generateRandomInteger = () => {
    return Math.floor(Math.random() * 6) + 1;
}
let startNum = generateRandomInteger()
const [selected, setSelected] = useState(startNum)
  
const handleVoteCLick = () => {
  console.log(selected)
  const copy = {...votes}
  copy[selected]+=1
  setVotes(copy)
  if (maximumVotes<votes[selected]) {
    setMaximumVotes(votes[selected])
    setMaximumAnecdote(anecdotes[selected])
  }
}

const handleRandomClick = () => {  
  setSelected(generateRandomInteger())
}

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      
      <br/>
      <button onClick={handleVoteCLick}>vote</button>
      <button onClick={handleRandomClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{maximumAnecdote}</p>
      <p>has {maximumVotes} votes</p>
    </div>
  )
}

export default App