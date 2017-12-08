import React, { Component } from 'react';
import { AddTodoForm }  from '../../containers/AddTodoForm';
import { VisibleTodoList } from '../../containers/VisibleTodoList';
import { Filter } from '../../components/filter/Filter';
import * as css from './WorkArea.css';

class WorkArea extends Component {
  render() {
    return (
      <div className="workArea">
        <div className="todoArea">
          <div className="todoAreaHeader">
            <AddTodoForm />
            <Filter />
          </div>
          <div className="todoAreaBody">
            <VisibleTodoList />
          </div>
        </div>
      </div>
    )
  }
}

export default WorkArea;