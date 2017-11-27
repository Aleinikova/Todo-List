import { combineReducers } from 'redux';
import { todos } from '../reducers/todo-reducer';
import { visibilityFilter } from '../reducers/filter-reducer';

export const todoApp = combineReducers({todos, visibilityFilter});;