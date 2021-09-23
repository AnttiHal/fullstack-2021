import React, { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0404405043' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName, 
      number: newNumber
    }
    console.log('nameObject.name: ' +nameObject.name)
    if (persons.map(person => person.name).includes(nameObject.name)) {
      window.alert(`nimi ${nameObject.name} on jo käytössä!`);
    } else {
    setPersons(persons.concat(nameObject))
    console.log('ollaan elsessä')
    console.log('new name: ' + newName)   
    setNewName('')
    setNewNumber('')  
    console.log('newname after empty: '+newName) 
    
    }
      
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
      name={newName} 
      number={newNumber}
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      onSubmit={addPerson}/>      
      <h2>Numbers</h2>            
      <Persons persons={persons}/>             
    </div>
  )

}

export default App