import React from "react";

const Course = ({course}) => {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total exercises={(course.parts.map(part => part.exercises)).reduce(reducer)}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
    <h1>{props.name}</h1>
    )
    
  }
  const Content = (props) => {
    return (
      <div>              
        {props.parts.map(part =>      
          <Part key={part.id} name={part.name} exercises={part.exercises}/>)}           
      </div>
    )
    
  }
  
  const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )  
  }
  
  const Total = (props) => {  
    return (
      <b>Number of exercises {props.exercises}</b>
    )  
  }
  
  export default Course