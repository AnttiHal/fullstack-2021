import React from "react";

const Person = ({person}) => {
    return (
        <p>{person.name} {person.number} <button>delete</button></p>
    )
}

export default Person