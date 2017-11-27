import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createStore, combineReducers } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
      
    case 'TOGGLE_TODO': 
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {completed: !state.completed});
      
    default: 
      return state;
  }
}

const todos = (state =[], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    
    case 'TOGGLE_TODO':
      return state.map(state => todo(state, action));
    
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
      
    default:
      return state;
  }
}

const todoApp = combineReducers({todos, visibilityFilter});
let nextTodoId = 0;

const Link = ({children, active, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="#" 
            onClick={e => {
                e.preventDefault();
                onClick()}
            }
        >
            {children}
        </a>
    )
}

const mapStateFilterToProps = (state, props) => {
    return {
        active: props.filter === state.visibilityFilter
    }
}

const mapDispatchFilterToProps = (dispatch, props) => {
    return {
        onClick: () => {
            dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
            })
        }
    }
}

const FilterLink = connect(mapStateFilterToProps, mapDispatchFilterToProps)(Link)

const Todo = ({ text, completed, onClick}) => {
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

const TodoList = ({todos, onTodoClick}) => {
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

const mapStateToProps = (state) => {
    console.log(state.visibilityFilter)
    return {
        todos: getFilteredTodos(state.todos, state.visibilityFilter)
    };
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            });
        }
    };
};
      
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button onClick={() => {
                dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: nextTodoId++
                })
                 input.value=''
            }}>
                Add todo
            </button>
        </div>
    )
}

AddTodo = connect()(AddTodo);

const Footer = () => {
    return (
        <div>
            Show:
            {' '}
            <FilterLink filter="SHOW_ALL">
                All
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_ACTIVE">
                Active
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_COMPLETED">
                Completed
            </FilterLink>
        </div>
    )
}
const getFilteredTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

const TodoApp = () => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
} 

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
)

Provider.childContexTypes = {
    store: PropTypes.object
}

registerServiceWorker();
