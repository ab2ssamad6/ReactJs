import React, { Component } from "react";
import axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id)
            if (!this.state.loadedPost || this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
                axios.get('https://blog-e2780.firebaseio.com/posts/' + this.props.id + '.json')
                    .then(res => {
                        const post = {
                            ...res.data,
                            id: this.props.id
                        }

                        this.setState({ loadedPost: post })
                        console.log('Loaded POST: ', res.data);
                        console.log('POST State: ', this.state.loadedPost);
                    }).catch(err => {
                        console.log('ERR: ', err);
                    });
    }

    render() {
        let post = <p>Please selecte a Post!</p>;
        if (this.props.id)
            post = <p>Loading...</p>;

        if (this.state.loadedPost)
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                </div>
            )

        return post;
    }
}

export default FullPost;