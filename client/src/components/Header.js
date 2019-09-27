import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='left brand-logo'>
            Emaily
          </a>
          <ul id='nav-mobile' className='right hide-on-med-on-down'>
            <li>
              <a href='/auth/google'>Log In with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
