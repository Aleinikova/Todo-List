import React, { Component } from 'react';
import * as css from './Header.css';

class Header extends Component {
  render () {

    return (
      <div className="header">
        <svg className="logo" width="150px" height="32px" viewBox="0 0 150 32">
          <g stroke="none" strokeWidth="1" fontSize="32" fontFamily="AguafinaScript-Regular, Aguafina Script" fontWeight="normal">
            <text fill="#ffffff">
              <tspan x="3" y="30">Your todo’s list</tspan>
            </text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Header;