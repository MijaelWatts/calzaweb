import React, {Component} from 'react';
import * as firebase from 'firebase';
import cookie from 'react-cookie';
import CONSTANTS from '../../config/constants.json'

// firebase.initializeApp(CONSTANTS.FIREBASE);

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
        <input type="text" onChange={ props.validateAndSetUser } />
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
        <input type="password" onChange={ props.validateAndSetPass } />
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
      <button type="button" disabled={props.disableButton} className="btn btn-success App-margintop-p0_5" onClick={ props.handleSignIn } >
        Entrar
      </button>
    </div>
  );
}

/**
 * Based on the props, a message will be displayed, or not.
 */
function DisplayErrorOrSuccessMessage(props) {
  if(props.messageToDisplay === CONSTANTS.ERROR) {
    return <ShowErrorMessage animationToSet={ props.animationToSet } />
  }
  else if(props.messageToDisplay === CONSTANTS.SUCCESS) {
    return <ShowSuccessMessage />
  }
  else {
    return(null);
  }
}

/**
 * Error message for when the user typed invalid credentials
 */
function ShowErrorMessage(props) {
  const animation = "alert alert-danger App-margintop-p1 animated " + props.animationToSet;

  return(
    <div className={ animation }>
      <strong>Error!</strong> Por favor valida que hayas ingresado las credenciales correctas.
    </div>
  );
}

/**
 * Success message for when the user tpyed correct credentials.
 */
function ShowSuccessMessage() {
  return(
    <div className="alert alert-success App-margintop-p1 animated fadeIn">
      <strong>Credenciales Correctas!</strong> Redireccionando.
    </div>
  );
}

class Login extends Component {

  /**
   * By default any session is killed once the login is rendered.
   */
  constructor(props) {
    super(props);

    this.state = {
      user             : null,
      pass             : null,    
      disableButton    : true,
      messageToDisplay : null,
      animationToSet   : null
    };

    this.killSession          = this.killSession.bind(this);
    this.validateAndSetUser   = this.validateAndSetUser.bind(this);
    this.validateAndSetPass   = this.validateAndSetPass.bind(this);
    this.enableDisableButon   = this.enableDisableButon.bind(this);
    this.setMessageToDisplay  = this.setMessageToDisplay.bind(this);
		this.handleSignIn         = this.handleSignIn.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setAnimation         = this.setAnimation.bind(this);

    this.killSession(); // The firebase authentication is killed.
  }

  /**
   * Killing firebase authentication, and cookie.
   */
  killSession(){
    cookie.remove(CONSTANTS.UID, { path: '/' });
    firebase.auth().signOut();
  }

  /**
   * User must be a valid email address.
   * Calls by default enableDisableButton() and setMessageToDisplay(null).
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
   * Calls by default enableDisableButton() and setMessageToDisplay(null).
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
   * User and password must meet the requirements for the button to be enable.
   */
  enableDisableButon() {
    let isDisabled = true;

    setTimeout( () => {
      if(this.state.user && this.state.pass) {
        isDisabled = false;
      }
      
      this.setState({
        disableButton: isDisabled
      });
    }, 500 );
  }

  /**
   * Sign in with the credentials the user entered.
   *  If the credentials are wrong, throw err message.
   * Call by default handleAuthentication method.
   */
  handleSignIn() {
    const user = this.state.user;
    const pass = this.state.pass;

    if(user && pass) {
      firebase.auth().signInWithEmailAndPassword(user, pass).catch((error) => {
        this.setMessageToDisplay(CONSTANTS.ERROR);
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
        const userId = firebase.auth().currentUser.uid;
        
        this.setMessageToDisplay(CONSTANTS.SUCCESS);

        cookie.save(CONSTANTS.UID, userId, { path: '/', maxAge: CONSTANTS.MAX_AGE });
        // this.whereToRedirect();
        this.props.setComponentToDisplay('panel');
      }
    });
  }

  /**
   * Create a cookie and redirect to a specific place.
   
  whereToRedirect() {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref(CONSTANTS.BRIDGE + userId).once('value').then((snapshot) => {
      cookie.save(CONSTANTS.UID, userId, { path: '/', maxAge: CONSTANTS.MAX_AGE });
      window.location.href = snapshot.val().redirect_to;
    });
  }
  */

  /**
   * Helps to show the messages in the UI.
   * @param message - null           : displays no message.
   * @param message - errorMessage   : displays an err message.
   * @param message - successMessage : displays a success message.
   */
  setMessageToDisplay(message) {
    if (message === null) {
      this.setAnimation(CONSTANTS.ANIMATION2);
    } else {
      this.setAnimation(CONSTANTS.ANIMATION1);
    }

    setTimeout( () => {
      this.setState({
        messageToDisplay : message
      }); 
    }, 500)
  }

  /**
   * Helps for the animation of the Success or Error message.
   * @param animation - fadeIn or fadeOut
   */
  setAnimation(animation) {
    this.setState({
      animationToSet : animation
    });
  }

  render() {
    return(
      <div className="App App-margintop-m1">
        <UserInput validateAndSetUser={ this.validateAndSetUser }/>
        <PasswordInput validateAndSetPass={ this.validateAndSetPass } />
        <LoginButton disableButton={this.state.disableButton} handleSignIn={this.handleSignIn} />
        <DisplayErrorOrSuccessMessage messageToDisplay={ this.state.messageToDisplay } animationToSet={ this.state.animationToSet }/>
      </div>
    );
  }
}

export default Login;
