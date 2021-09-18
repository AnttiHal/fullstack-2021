import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const points = new Uint8Array(7); 
  const copy = [...points]
  const [votes, setVotes] = useState({
    0: 0, 1: 3, 2: 345, 3: 0, 4: 56, 5: 0, 6: 0
  })

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const generateRandomInteger = () => {
    return Math.floor(Math.random() * 6) + 1;
}
let startNum = generateRandomInteger()
const [selected, setSelected] = useState(startNum)
  
const handleVoteCLick = () => {
  let num = selected
  setVotes({...votes, num: votes.num +1})
  console.log(num)
  console.log(votes.num)
}

const handleRandomClick = () => {
  
  setSelected(generateRandomInteger())
}

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {votes[0]}votes
      
      <br/>
      <button onClick={handleVoteCLick}>vote</button>
      <button onClick={handleRandomClick}>next anecdote</button>
    </div>
  )
}

export default App