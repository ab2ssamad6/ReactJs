import React, { useRef } from 'react';
import './NewPost.css';
import axios from 'axios';

const NewPost = props => {
    const titleInputRef = useRef();
    const contentInputRef = useRef();

    const postDataHundler = () => {

        const post = {
            title: titleInputRef.current.value,
            content: contentInputRef.current.value,
            image_path: ''
        }

        axios.post('https://blog-e2780.firebaseio.com/posts.json', post)
            .then(res => {
                console.log('RES: ', res);
                props.history.push('/');
            }).catch(err => {
                console.log('ERR: ', err);
            });

        //this.init();
    }

    return (
        <div className="NewPost">
            <h1>Add a Post</h1>
            <label>Title</label>
            <input
                type="text"
                ref={titleInputRef}
            //value={this.state.title}
            //onChange={(event) => this.setState({ title: event.target.value })}
            />

            <label>Content</label>
            <textarea
                rows="4"
                ref={contentInputRef}
            //value={this.state.content}
            //onChange={(event) => this.setState({ content: event.target.value })}
            />
            <button onClick={postDataHundler}>Add Post</button>
        </div>
    );

    /* state = initialState;

    init = () => this.setState(initialState);

    postDataHundler = () => {

        const post = {
            title: this.state.title,
            content: this.state.content,
            image_path: this.state.image_path
        }

        axios.post('https://blog-e2780.firebaseio.com/posts.json', post)
            .then(res => {
                console.log('RES: ', res);
                this.props.history.push('/');
            }).catch(err => {
                console.log('ERR: ', err);
            });

        this.init();
    }

    render() {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <button onClick={this.postDataHundler}>Add Post</button>
            </div>
        )
    } */
}

export default NewPost;