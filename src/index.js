import React from 'react';
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

const FilterLink = ({filter, children, current, onClick}) => {
    if (filter === current) {
        return <span>{children}</span>
    }
    return (
        <a href="#" 
            onClick={e => {
                e.preventDefault();
                onClick(filter)}
            }
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

const AddTodo = ({onAddClick}) => {
    let input;
    return (
        <div>
            <input ref={node => input = node}/>
            <button onClick={() => {
                 onAddClick(input.value)
                 input.value=''
            }}>
                Add todo
            </button>
        </div>
    )
}
const Footer = ({visabilityFilter, onFilterClick}) => {
    return (
        <div>
            Show:
            {' '}
            <FilterLink filter="SHOW_ALL"
                        current={visabilityFilter}
                        onClick={onFilterClick}>
                All
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_ACTIVE"
                        current={visabilityFilter}
                        onClick={onFilterClick}>
                Active
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_COMPLETED"
                        current={visabilityFilter}
                        onClick={onFilterClick}>
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

const TodoApp = ({todos, visabilityFilter}) => {
    return (
        <div>
            <AddTodo onAddClick={text => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text,
                    id: nextTodoId++
                })
            }}/>
            <TodoList todos={getFilteredTodos(todos, visabilityFilter)}
                      onTodoClick={id => {
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
            }}/>
            <Footer visabilityFilter={visabilityFilter}
                    onFilterClick={filter => {
                        store.dispatch({
                            type: 'SET_VISABILITY_FILTER',
                            filter
                        })
            }}/>
        </div>
    )
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
