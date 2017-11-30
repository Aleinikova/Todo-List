import React from 'react';
import { FilterLink } from '../containers/FilterLink';

export const Filter = () => {
    return (
        <div>
            Show:
            {' '}
            <FilterLink filter="SHOW_ALL">
                All
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_ACTIVE">
                Active
            </FilterLink>
            {' '}
            <FilterLink filter="SHOW_COMPLETED">
                Completed
            </FilterLink>
        </div>
    )
}