import React from 'react';

const person = (props) => {
    return (
        <div>
            <p>Im {props.name} and I am {props.age} years old!</p>
            <input type="text" onChange={props.changed} />
        </div>
    )
}

export default person;