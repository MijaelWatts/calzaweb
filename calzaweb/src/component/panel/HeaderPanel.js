import React, { Component } from 'react';
import * as firebase from 'firebase';
import CONSTANTS from '../../config/constants.json'
import '../../css/App.css';
import logo_calzaweb_blanco_mini from '../../img/logo-calzaweb-blanco-mini.png';

class HeaderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName : ""
    };
  }

  /**
   * Get the user name from the DB for displaying it.
   */
  componentWillMount () {
    if ( this.props.userId ) {
      firebase.database().ref(CONSTANTS.REFERENCE1).once('value').then( (snapshot) => {
        this.setState ({
          userName : snapshot.val().name
        });
      });
    }
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
              <ul className="nav navbar-nav navbar-right">
                <li className="active">
                  <a href="#"> Bienvenido { this.state.userName }
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderPanel;
