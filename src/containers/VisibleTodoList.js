import { connect } from 'react-redux';
import { toggleTodo } from '../actions/todo-actions';
import { TodoList } from '../components/TodoList';

const mapStateToProps = (state) => {
    return {
        todos: getFilteredTodos(state.todos, state.visibilityFilter)
    };
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};

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
      
export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);