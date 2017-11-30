import React from 'react';
import { addTodo } from '../../actions/todo-actions';
import './AddTodo.css';

export const AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div className="todoForm">
            <input className="todoInput" placeholder="Enter Todo" ref={node => input = node}/>
            <button className="todoAddButton" onClick={() => {
                dispatch(addTodo(input.value))
                 input.value=''
            }}>
                Add todo
            </button>
        </div>
    )
}