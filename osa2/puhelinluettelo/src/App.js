import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName, 
      
    }
    console.log('nameObject.name: ' +nameObject.name)
    if (persons.map(person => person.name).includes(nameObject.name)) {
      window.alert('nimi ${nameObject.name} on jo käytössä!');
    } else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log(newName)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
        
        
      </ul>
    </div>
  )

}

export default App