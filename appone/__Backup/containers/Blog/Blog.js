import React from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch } from 'react-router-dom';
//import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';
import AppBar from './../../components/appBar';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

const Blog = props => {
    return (
        <div>
            <AppBar />

            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts/:id" component={FullPost} />
                </Switch>
            </div>
        </div>
    )
}

export default Blog;
