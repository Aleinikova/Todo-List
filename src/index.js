import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import Header from '../src/components/header/Header';
import WorkArea from '../src/components/work-area/WorkArea';
import { todoApp } from '../src/reducers/app-reducer';
import './index.css';

const TodoApp = () => {
    return (
        <div className="app">
            <Header/>
            <WorkArea/>
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
