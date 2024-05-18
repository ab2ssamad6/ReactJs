import React, { Component } from 'react';
import './AddPost.css';

const initialState = {
    title: '',
    content: '',
    image_path: ''
}

class AddPost extends Component {
    state = initialState;

    init = () => this.setState(initialState);

    postDataHundler = () => {
        this.props.onSubmit(this.state);
        this.init();
    }

    render() {
        return (
            <div className="AddPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <button onClick={this.postDataHundler}>Add Post</button>
            </div>
        )
    }
}

export default AddPost;