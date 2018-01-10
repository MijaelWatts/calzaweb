import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import cookie from 'react-cookie';
import CONSTANTS from './constants.json';

firebase.initializeApp(CONSTANTS.FIREBASE);

class Validator extends Component {

  componentWillMount() {
    let userId = cookie.load(CONSTANTS.UID);

    if(userId) {
      firebase.database().ref(CONSTANTS.REFERENCE + userId).once('value').then( (snapshot) => {
        window.location.href = snapshot.val().redirect_to;
      });
    } else {
      cookie.remove(CONSTANTS.UID, { path: '/' });
      window.location.href = CONSTANTS.HREF;
    }
  }

  render() {
    return (
      null
    );
  }
}

ReactDOM.render(
  <Validator />,
  document.getElementById('root')
);
