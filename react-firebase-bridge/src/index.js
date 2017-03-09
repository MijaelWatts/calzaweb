import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import cookie from 'react-cookie';

/**
 * Your firebase web setup here
 */
// const config = {
//   apiKey: "AIzaSyB3K29Aj7ySitbNmctTnoXq0z03ku6ssqw",
//   authDomain: "login-project-35552.firebaseapp.com",
//   databaseURL: "https://login-project-35552.firebaseio.com",
//   storageBucket: "login-project-35552.appspot.com",
//   messagingSenderId: "338943979739"
// };
const config = {
  apiKey: "AIzaSyCK-nntr0BQvvi85x7hDKdq5_1QNPIP7dc",
  authDomain: "calzaweb-11d59.firebaseapp.com",
  databaseURL: "https://calzaweb-11d59.firebaseio.com",
  storageBucket: "calzaweb-11d59.appspot.com",
  messagingSenderId: "660940429104"
};

firebase.initializeApp(config);

class Validator extends Component {
	/**
	 * Get the cookie and validatewhere to redirect the user based on the cookie.
	 * Otherwise redirect the user back to the login.
	 */
  componentWillMount() {
    let userId = cookie.load('userId');

    if(userId) {
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        // Redirect
        window.location.href = snapshot.val().redirect_to;
      });
    } else {
      window.location.href = "http://localhost:3000/";
    }
  }

  // There´s no need of rendering anything
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
