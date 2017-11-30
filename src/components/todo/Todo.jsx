import React from 'react';
import * as css from './Todo.css';

export const Todo = ({ text, completed, onClick }) => {

    const className = completed ? "todo todo_isCompleted" : "todo";
  return (
      <li className={className}
          
      >
        <div className="body" onClick={onClick}>
            <span>{text}</span>
        </div>
      </li>
  )
}