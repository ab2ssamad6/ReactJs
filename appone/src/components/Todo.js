import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';
import List from './List';

import { useFormInput } from '../hooks/forms';

const Todo = props => {
    //const [todoName, setTodoName] = useState('');

    //useState instead useReducer
    //const [todoList, setTodoList] = useState([]);
    //const [submittedTodo, setSubmittedTodo] = useState(null);

    const [inputIsValid, setInputIsValid] = useState(false);

    const todoInputRef = useRef();

    //Use Custom hook
    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        axios.get('https://todo-list-bb387.firebaseio.com/todos.json')
            .then(result => {
                console.log(result);

                const todoData = result.data;
                const todos = [];
                for (const key in todoData) {
                    todos.push({ id: key, name: todoData[key].name })
                }

                //useState unstead useReducer
                //setTodoList(todos);

                //using useReducer
                dispatch({ type: 'SET', payload: todos });
            });
        return () => {
            console.log('Cleanup')
        }
    }, []);

    //useState instead useReducer
    /* useEffect(() => {
        if (submittedTodo)
            //using useState
            //setTodoList(todoList.concat(submittedTodo));

            dispatch({ type: 'ADD', payload: submittedTodo });
    }, [submittedTodo]); */


    /* const inputChangeHandler = event => {
        setTodoName(event.target.value);
    } */

    const todoAddHandler = () => {
        //***** costum hook useFormInput ******
        //const todoName = todoInputRef.current.value;
        const todoName = todoInput.value;

        axios.post('https://todo-list-bb387.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                console.log(res);

                setTimeout(() => {

                    const todoItem = { id: res.data.name, name: todoName };

                    //useState instead useReducer
                    //setSubmittedTodo(todoItem);

                    dispatch({ type: 'ADD', payload: todoItem });
                }, 3000);

            })
            .catch(err => {
                console.log(err);
            });
    }

    const todoRemoveHandler = todoId => {
        axios.delete(`https://todo-list-bb387.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'REMOVE', payload: todoId });
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    const inputValidationHandler = event => {
        if (event.target.value.trim() === '')
            setInputIsValid(false);
        else
            setInputIsValid(true);
    }

    return (
        <React.Fragment>

            {/***** without useRef *****/}
            {/*
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName} />
            */}

            {/****** without costum hook ******/}
            {/* <input
                type="text"
                placeholder="Todo"
                ref={todoInputRef}
                onChange={inputValidationHandler}
                style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
            /> */}
            
            {/****** costum hook useFormInput ******/}
            <input
                type="text"
                placeholder="Todo"
                onChange={todoInput.onChange}
                value={todoInput.value}
                style={{ backgroundColor: todoInput.value ? 'transparent' : 'red' }}
            />

            <button type="button" onClick={todoAddHandler}>Add</button>

            {useMemo(() => (
                <List items={todoList} onClick={todoRemoveHandler} />
            ),
                [todoList]
            )}

        </React.Fragment>
    );
};

export default Todo;