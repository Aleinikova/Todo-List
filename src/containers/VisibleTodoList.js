import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions/todo-actions';
import { TodoList } from '../components/todo-list/TodoList';
import { getVisibileTodos } from '../reducers/app-reducer';

const mapStateToProps = (state, { match }) => {
    return {
        todos: getVisibileTodos(state, match.params.filter),
    };
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
      
export const VisibleTodoList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));