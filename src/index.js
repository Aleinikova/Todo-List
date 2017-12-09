import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { loadState, saveState } from './local-storage';
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

const initialState = loadState();
const store = createStore(todoApp, initialState);

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    })
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/all"/>
            </Route>
            <Route exact path="/:filter" component={TodoApp}/>
        </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

Provider.childContexTypes = {
    store: PropTypes.object
}
