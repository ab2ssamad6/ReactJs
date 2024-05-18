import React, { useMemo, useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const Todo = props => {
    const [inputIsValid, setInputIsValid] = useState(false);
    //const [todoName, setTodoName] = useState('');
    //const [submittedTodo, setSubmittedTodo] = useState(null);
    //const [todoList, setTodoList] = useState([]);
    //const todoInputRef = useRef();
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
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        axios.get('https://todo-list-bb387.firebaseio.com/todos.json').then(res => {
            console.log('DATA: ', res);

            const todoData = res.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({ id: key, name: todoData[key].name })
            }

            //setTodoList(todos); using dispatch
            dispatch({ type: 'SET', payload: todos });

        });
    }, []);

    /*     const inputChangeHandler = event => {
            setTodoName(event.target.value);
        }; */

    const todoAddHundler = () => {
        //const todoName = todoInputRef.current.value;
        const todoName = todoInput.value;

        axios.post('https://todo-list-bb387.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                const todoItem = { id: res.data.name, name: todoName };
                //setSubmittedTodo(todoItem);

                dispatch({ type: 'ADD', payload: todoItem });

                console.log('RES: ', res);
                console.log('todoItem: ', todoItem);
            }).catch(err => {
                console.log('ERR: ', err);
            });
    };

    const todoRemoveHundler = todoId => {
        axios.delete(`https://todo-list-bb387.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'REMOVE', payload: todoId });
            }).catch(err => {
                console.log('ERR: ', err);
            });
    };

    const inputValidationHandler = event => {
        if (event.target.value.trim() === '')
            setInputIsValid(false);
        else
            setInputIsValid(true);
    };

    return (
        <React.Fragment>
            <input key="input"
                type="text"
                placeholder="Todo"
                //ref={todoInputRef}
                //onChange={inputValidationHandler}
                onChange={todoInput.onChange}
                value={todoInput.value}
                //style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
                style={{ backgroundColor: todoInput.valitidy === true ? 'transparent' : 'red' }}
            />,
        <button key="btn" type="button" onClick={todoAddHundler}>Add</button>,
        {useMemo(() => (
                <List key="list" items={todoList} onClick={todoRemoveHundler} />
            ), [todoList]
            )}
        </React.Fragment>
    );
};

export default Todo;

