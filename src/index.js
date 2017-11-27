import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { AddTodoForm }  from '../src/containers/AddTodoForm';
import { VisibleTodoList } from '../src/containers/VisibleTodoList.js';
import { Footer } from '../src/components/Footer';
import { todoApp } from '../src/reducers/app-reducer';
import './index.css';

const TodoApp = () => {
    return (
        <div>
            <AddTodoForm />
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
