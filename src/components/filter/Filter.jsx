import React from 'react';
import { FilterLink } from '../link/FilterLink';
import "./Filter.css";

export const Filter = () => {
    return (
        <div className="filter">
            <FilterLink filter="all">
                All
            </FilterLink>
            <FilterLink filter="active">
                Active
            </FilterLink>
            <FilterLink filter="completed">
                Completed
            </FilterLink>
        </div>
    )
}