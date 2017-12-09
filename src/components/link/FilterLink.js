import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Link.css';

const LinkComponent = (props) => {
    const { filter, children, location, match } = props;
    // console.log(match)

    // if (`/${filter}` === location.pathname || (location.pathname === '/' && filter === 'all')) {
    //     return <span className="currentLink">{children}</span>
    // }

    return (
        <NavLink className="link" activeClassName="currentLink" to={`/${filter}`} exact={true}>
            {children}
        </NavLink>
    )
}

export const FilterLink = withRouter(LinkComponent);

