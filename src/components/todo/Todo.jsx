import React from 'react';
import './Todo.css';

export const Todo = ({ text, completed, onClick }) => {

    const className = completed ? "todo todo_isCompleted" : "todo";
  return (
      <li className={className}>
        <div className="todoBody">
            <span className="todoTitle" onClick={onClick}>{text}</span>
            <div className="prioritySelectors">
                <div className="prioritySelector prioritySelector_low">
                    <input type="radio" name="selector" className="radio" id="prioritySelector_low"/>
                    <label className="label label_low" htmlFor="prioritySelector_low"></label>
                </div>
                <div className="prioritySelector prioritySelector_medium">
                    <input type="radio" name="selector" className="radio" id="prioritySelector_medium"/>
                    <label className="label label_medium" htmlFor="prioritySelector_medium"></label>
                </div>
                <div className="prioritySelector prioritySelector_high">
                    <input type="radio" name="selector" className="radio" id="prioritySelector_high"/>
                    <label className="label label_high" htmlFor="prioritySelector_high"></label>
                </div>
            </div>
        </div>
      </li>
  )
}