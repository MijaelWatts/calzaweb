import React, { Component } from 'react';
import * as firebase from 'firebase';
import cookie from 'react-cookie';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import CONSTANTS from '../config_files/constants.json'
import '../css/App.css';
import logo_calzaweb_blanco_mini from '../img/logo-calzaweb-blanco-mini.png';

firebase.initializeApp(CONSTANTS.FIREBASE);

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username : ""
    };

    this.signOut     = this.signOut.bind(this);
    this.getUserName = this.getUserName.bind(this);

    this.getUserName();
  }

  /**
   * When signing out, remove the cookie, kill the authentication, and redirect the user.
   */
  signOut() {
    cookie.remove(CONSTANTS.UID, { path: '/' });
    firebase.auth().signOut();
    window.location.href = CONSTANTS.HREF1;
  }

  /**
   * Get the user name from the DB for displaying it.
   */
  getUserName() {
    firebase.database().ref(CONSTANTS.REFERENCE1).once('value').then( (snapshot) => {
      this.setState ({
        username       : snapshot.val().name
      });
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default App-backgroundcolor-green">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand App-margintop-m7" href="#">
                <img src={logo_calzaweb_blanco_mini} alt="calzaweb" />
              </a>
            </div>

            
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active">
                  <a href="#"> {MESSAGE_CONSTANTS.REGISTER} 
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {this.state.username} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#" onClick={ this.signOut }> { MESSAGE_CONSTANTS.CLOSE_SESSION } </a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
