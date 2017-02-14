import React, { Component } from 'react';
import * as firebase from 'firebase';
import cookie from 'react-cookie';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import '../css/App.css';
import logo_calzaweb_blanco_mini from '../img/logo-calzaweb-blanco-mini.png';

// Your firebase web setup here
const config = {
  apiKey: "AIzaSyB3K29Aj7ySitbNmctTnoXq0z03ku6ssqw",
  authDomain: "login-project-35552.firebaseapp.com",
  databaseURL: "https://login-project-35552.firebaseio.com",
  storageBucket: "login-project-35552.appspot.com",
  messagingSenderId: "338943979739"
};
firebase.initializeApp(config);

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username      : "",
      sessionMessage: ""
    };

    this.signOut     = this.signOut.bind(this);
    this.getUserName = this.getUserName.bind(this);

    this.getUserName(props.userId);
  }

  /**
   *
   */
  signOut() {
    cookie.remove('userId', { path: '/' });
    firebase.auth().signOut();

    window.location.href = "http://localhost:3000/";
  }

  /**
   *
   */
  getUserName(userId) {
    firebase.database().ref('/users-data/' + userId).once('value').then( (snapshot) => {
      this.setState ({
        username      : snapshot.val().name,
        sessionMessage: MESSAGE_CONSTANTS.CLOSE_SESSION
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
                  <a href="#"> {MESSAGE_CONSTANTS.REGISTER} <span className="sr-only">(current)</span></a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {this.state.username} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#" onClick={ this.signOut }> {this.state.sessionMessage} </a></li>
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
