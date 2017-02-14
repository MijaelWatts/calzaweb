import React, { Component } from 'react';
import '../css/App.css';
import logo_calzaweb_blanco_mini from '../img/logo-calzaweb-blanco-mini.png';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default App-backgroundcolor-green">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand App-margintop-m8" href="#">
                <img src={logo_calzaweb_blanco_mini} alt="calzaweb" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
