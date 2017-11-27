import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
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

const visabilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISABILITY_FILTER':
      return action.filter;
      
    default:
      return state;
  }
}

const combineReducers = (reducers) => {
 return (state = {}, action) => {
   return Object.keys(reducers).reduce(
     (nextState, key) => {
       nextState[key] = reducers[key](
         state[key],
         action
     );
     return nextState;
   },
   {}
  );
 }; 
}

const todoApp = combineReducers({todos, visabilityFilter});
const store =createStore(todoApp);
let nextTodoId = 0;

const FilterLink = ({filter, children, current}) => {
    if (filter === current) {
        return <span>{children}</span>
    }
    return (
        <a href="#" 
            onClick={e => {
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISABILITY_FILTER',
                    filter
                })
            }}
        >
            {children}
        </a>
    )
}

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

class TodoApp extends Component {
  render() {
      const { todos, visabilityFilter } = this.props;
      const filteredTodos = getFilteredTodos(todos, visabilityFilter);

    return (
        <div>
            <input ref={node => this.input = node}/>
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: this.input.value,
                    id: nextTodoId++
                })
                this.input.value='';
            }}>
                Add todo
            </button>
            <TodoList todos={filteredTodos}
                      onTodoClick={id => {
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                      }}
            />
            <div>
                Show:
                {' '}
                <FilterLink filter="SHOW_ALL"
                            current={visabilityFilter}>
                    All
                </FilterLink>
                {' '}
                <FilterLink filter="SHOW_ACTIVE"
                            current={visabilityFilter}>
                    Active
                </FilterLink>
                {' '}
                <FilterLink filter="SHOW_COMPLETED"
                            current={visabilityFilter}>
                    Completed
                </FilterLink>
            </div>
        </div>
    )
  }
} 
const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('root')
  )
}

store.subscribe(render);
render();

registerServiceWorker();
