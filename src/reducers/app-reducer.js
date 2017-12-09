import { combineReducers } from 'redux';
import todos, * as fromTodos from '../reducers/todo-reducer';

export const todoApp = combineReducers({todos});

export const getVisibileTodos = (state, filter) => (
  fromTodos.getVisibileTodos(state.todos, filter)
);