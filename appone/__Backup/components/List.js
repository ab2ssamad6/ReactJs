import React from 'react';

const List = props => {
    console.log('List rendering...');
    
    return (
        <ul key="ul">
            {props.items.map(item => (
                <li key={item.id} onClick={props.onClick.bind(this, item.id)} >{item.name}</li>
            ))}
        </ul>
    );
};

export default List;