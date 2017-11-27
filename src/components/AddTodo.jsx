import React from 'react';
import { addTodo } from '../actions/todo-actions';

export const AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button onClick={() => {
                dispatch(addTodo(input.value))
                 input.value=''
            }}>
                Add todo
            </button>
        </div>
    )
}