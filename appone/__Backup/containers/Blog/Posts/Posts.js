import React, { useState, useEffect, useMemo } from 'react';
import Post from './../../../components/Post';
import axios from 'axios';

const Posts = props => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://blog-e2780.firebaseio.com/posts.json')
            .then(res => {
                const postsData = res.data;
                const posts = Object.keys(postsData).map(key => {
                    return { id: key, title: postsData[key].title, content: postsData[key].content }
                })

                setPosts(posts);
                console.log('RES: ', posts);
            }).catch(err => {
                console.log('ERR: ', err);
            });
    }, [])

    const postSelectedHandler = id => {
        props.history.push('/posts/' + id)
    }

    return (
        <section className="Posts">

            {useMemo(() => (
                posts.map((el) => (
                    <Post
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        clicked={postSelectedHandler} />
                ))
            ), [posts])}

            {/* posts.map((el) => (
                <Post
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    clicked={postSelectedHandler} />
            )) */}
        </section>
    );
}

export default Posts;