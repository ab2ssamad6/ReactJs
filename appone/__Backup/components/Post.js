import React from 'react';

const post = props => (
    <article className="Post" onClick={props.clicked.bind(this, props.id)}>
        <h1>{props.title}</h1>
    </article>
)

export default post;