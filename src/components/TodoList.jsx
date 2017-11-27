import React from 'react';

const Todo = ({ text, completed, onClick }) => {
    return (
        <li onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none' 
            }}
        >
            {text}
        </li>
    )
}

export const TodoList = ({ todos, onTodoClick }) => {
    return (
        <ul>
            {
                todos.map(todo => (
                    <Todo key={todo.id}
                          {...todo}
                          onClick={() => onTodoClick(todo.id)}
                    />
                ))
            }
        </ul>
    )
}