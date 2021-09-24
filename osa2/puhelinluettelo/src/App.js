import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')



  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
        })        
    }   
    setNewName('')
          setNewNumber('')   
  }

  const delPerson = (person) => {
    const id = person.id
    if (window.confirm(`haluatko varmasti poistaa kohteen ${person.name}?`)) {
      personService
      .del(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
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
      newName={newName} 
      newNumber={newNumber}
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      onSubmit={addPerson}/>      
      <h2>Numbers</h2>            
      <Persons persons={persons} delPerson={delPerson}/>             
    </div>
  )

}

export default App