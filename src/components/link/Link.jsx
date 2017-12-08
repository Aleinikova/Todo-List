import React from 'react';
import './Link.css';

export const Link = ({children, active, onClick}) => {
    if (active) {
        return <span className="currentLink">{children}</span>
    }
    return (
        <a className="link"
            href="#" 
            onClick={e => {
                e.preventDefault();
                onClick()}
            }
        >
            {children}
        </a>
    )
}

