import React, {Component} from 'react';
import * as firebase from 'firebase';
import cookie from 'react-cookie';

/**
 * Your firebase web setup here
 */
const config = {
  apiKey: "AIzaSyB3K29Aj7ySitbNmctTnoXq0z03ku6ssqw",
  authDomain: "login-project-35552.firebaseapp.com",
  databaseURL: "https://login-project-35552.firebaseio.com",
  storageBucket: "login-project-35552.appspot.com",
  messagingSenderId: "338943979739"
};
firebase.initializeApp(config);

/**
 * Input for typing the user email
 */
function UserInput(props) {
  return (
    <div className="App-margintop-p0_5 row col-xs-12 col-md-12 col-sm-12 col-lg-12">
      <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
        <p className="App-textalign-end App-marginright-m4">
          Usuario:
        </p>
      </div>
      <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 App-textalign-initial">
        <input type="text" className="App-login-inputs" onChange={props.validateAndSetUser} />
      </div>
    </div>
  );
}

/**
 * Input for typing the user password.
 */
function PasswordInput(props) {
  return(
    <div className="App-margintop-p0_5 row col-xs-12 col-md-12 col-sm-12 col-lg-12">
      <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
        <p className="App-textalign-end App-marginright-m4">
          Contraseña:
        </p>
      </div>
      <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 App-textalign-initial">
        <input type="password" className="App-login-inputs" onChange={props.validateAndSetPass} />
      </div>
    </div>
  );
}

/**
 * Button for login
 */
function LoginButton(props) {
  return(
    <div>
      <button type="button" disabled={props.disabled} className="btn btn-success App-margintop-p0_5" onClick={props.handleSignIn} >
        Entrar
      </button>
    </div>
  );
}

/**
 * Based on the props that is true, a message will be displayed, or not.
 */
function DisplayErrorOrSuccessMessage(props) {
  if(props.messageToDisplay === 'errorMessage') {
    return <ShowErrorMessage />
  }
  else if(props.messageToDisplay === 'successMessage') {
    return <ShowSuccessMessage />
  }
  else {
    return(null);
  }
}

/**
 * Error message for when the user typed invalid credentials
 */
function ShowErrorMessage() {
  return(
    <div className="alert alert-danger App-margintop-p1">
      <strong>Error!</strong> Por favor valida que hayas ingresado las credenciales correctas.
    </div>
  );
}

/**
 * Success message for when the user tpyed correct credentials.
 */
function ShowSuccessMessage() {
  return(
    <div className="alert alert-success App-margintop-p1">
      <strong>Credenciales Correctas!</strong> Redireccionando...
    </div>
  );
}

class Login extends Component {

  /**
   * For security the session isn't stored.
   * If the user goes back to the login, the firebase authentication is killed.
   */
  constructor(props) {
    super(props);

    this.state = {
      user             : null,
      pass             : null,    
      disabled         : true,
      messageToDisplay : null
    };

    this.killEverything        = this.killEverything.bind(this);
    this.validateAndSetUser    = this.validateAndSetUser.bind(this);
    this.validateAndSetPass    = this.validateAndSetPass.bind(this);
    this.enableDisableButon    = this.enableDisableButon.bind(this);
    this.setMessageToDisplay   = this.setMessageToDisplay.bind(this);
		this.handleSignIn          = this.handleSignIn.bind(this);
    this.handleAuthentication  = this.handleAuthentication.bind(this);

    this.killEverything(); // The firebase authentication is killed.
  }

  /**
   * Killing firebase authentication, and cookie.
   */
  killEverything(){
    cookie.remove('userId', { path: '/' });
    firebase.auth().signOut();
  }

  /**
   * User must be a valid email address.
   * Calls by default enbleDisableButton method.
   * By default, this method will setMessageToDisplay to null.
   */
  validateAndSetUser(e) {
    let usuario = null;
    // eslint-disable-next-line
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isTheEmailValid = regexp.test(e.target.value);
    
    isTheEmailValid ? (usuario = e.target.value) : (usuario = null);

    this.setState({
      user : usuario
    });

    this.enableDisableButon();
    this.setMessageToDisplay(null);
  }

  /**
   * Password must be at least 5 characters long to be set with the value entered by the user.
   * Calls by default enbleDisableButton method.
   * By default, this method will setMessageToDisplay to null.
   */
  validateAndSetPass(e) {
    let password = null;

    (e.target.value.length > 4) ? (password = e.target.value) : (password = null);

    this.setState({
      pass : password
    });

    this.enableDisableButon();
    this.setMessageToDisplay(null);
  }

  /**
   * If user and password don't meet the requirements:
   *    The "Sign In" button won't be enabled
   */
  enableDisableButon() {
    let isDisabled = true;

    if(this.state.user && this.state.pass) {
      isDisabled = false;
    }
    
    this.setState({
      disabled: isDisabled
    });
  }

  /**
   * Helps to show the messages in the UI.
   * @param message - null           : displays no message.
   * @param message - errorMessage   : displays an err message.
   * @param message - successMessage : displays a success message.
   */
  setMessageToDisplay(message) {
    this.setState({
      messageToDisplay : message
    }); 
  }

  /**
   * Sign in with the credentials the user entered.
   *  If the credentials are wrong, throw err messages.
   * Call by default handleAuthentication method.
   */
  handleSignIn() {
    const user = this.state.user;
    const pass = this.state.pass;

    if(user && pass) {
      firebase.auth().signInWithEmailAndPassword(user, pass).catch((error) => {
        this.setMessageToDisplay('errorMessage');
      });  
    }

    this.handleAuthentication();
  }

  /**
   * Checks if the authentication state of the user changed.
   *  If it did, means the user logged in successfully.
   *  If it did, a success message is displayed automatically.
   *  If it did, whereToRedirect method is displayed.
   */
  handleAuthentication(props) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setMessageToDisplay('successMessage');
        this.whereToRedirect();
      }
    });
  }

  /**
   * Create a cookie and redirect to a specific place.
   */
  whereToRedirect() {
    const userId = firebase.auth().currentUser.uid;
    // const userId = "vBHoWoCtbiXEl67FXubugYjcyhO2";

    firebase.database().ref('/bridge/' + userId).once('value').then(function(snapshot) {
      // Save the loged user
      // const updates = {};
      // updates['/users-data/' + userId + '/log'] = userId;
      // firebase.database().ref().update(updates);
      cookie.save('userId', userId, { path: '/', maxAge: 3600 });

      // Redirect
      window.location.href = snapshot.val().redirect_to;
    });
  }

  render() {
    return(
      <div className="App App-margintop-m1">
        <UserInput validateAndSetUser={ this.validateAndSetUser }/>
        <PasswordInput validateAndSetPass={ this.validateAndSetPass } />
        <LoginButton disabled={this.state.disabled} handleSignIn={this.handleSignIn} />
        <DisplayErrorOrSuccessMessage messageToDisplay={ this.state.messageToDisplay } />
      </div>
    );
  }
}

export default Login;
