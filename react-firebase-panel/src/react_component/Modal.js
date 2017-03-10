import React, {Component} from 'react';
import * as firebase from 'firebase';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';

/**
 * Based on the props that is true, a message will be displayed, or not.
 */
function DisplayErrorOrSuccessMessage(props) {

  if(props.messageToDisplay === 'errorMessage') {
    return <ShowErrorMessage animationToSet={ props.animationToSet } />
  }
  else if(props.messageToDisplay === 'successMessage') {
    return <ShowSuccessMessage animationToSet={ props.animationToSet } />
  }
  else {
    return(null);
  }
}

/**
 * Error message for when the user couldn't be stored in the DB
 */
function ShowErrorMessage(props) {
  const animation = "alert alert-danger App-textalign-center animated "+props.animationToSet;

  return(
    <div className={ animation }>
      <strong>Error!</strong> El correo asignado al usuario ya está en uso.
    </div>
  );
}

/**
 * Success message for when the user was able to be stored in the DB
 */
function ShowSuccessMessage(props) {
  const animation = "alert alert-success App-textalign-center animated "+props.animationToSet;

  return(
    <div className={ animation }>
      <strong>Exito!</strong> El usuario fue agregado correctamente.
    </div>
  );
}

class Modal extends Component {

	constructor(props) {
		super(props);

		this.validateEmail       = this.validateEmail.bind(this);
    this.enableDisableButon1 = this.enableDisableButon1.bind(this);
    this.enableDisableButon2 = this.enableDisableButon2.bind(this);
    this.setStateButton1     = this.setStateButton1.bind(this);
    this.validateInput       = this.validateInput.bind(this);
    this.addUser             = this.addUser.bind(this);
    this.clearInputBoxes     = this.clearInputBoxes.bind(this);
    this.setMessageToDisplay = this.setMessageToDisplay.bind(this);
    this.closeModalActions   = this.closeModalActions.bind(this);

    this.state = ({
      uid              : props.userId,
      user             : null,
      inCharge         : null,
      city             : null,
      state            : null,
      password         : null,
      disabled1        : true,
      disabled2        : true,
      messageToDisplay : null,
      animationToSet   : null,
      inputText1Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText2Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText3Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText4Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText5Css    : MESSAGE_CONSTANTS.FORM_CONTROL
    });
	}

	/**
   * User must be a valid email address.
   * If it's set input text to green color, if it's not set it to red color.
   * Calls by default some methods.
   */
  validateEmail(e) {
    let usuario = null;
    let inputTextCss = MESSAGE_CONSTANTS.FORM_CONTROL;

    // eslint-disable-next-line
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isTheEmailValid = regexp.test(e.target.value);
    
    if(isTheEmailValid) {
      usuario = e.target.value
      inputTextCss += " App-bordercolor-lightseagreen";
    } else {
      inputTextCss += " App-bordercolor-red";
      usuario = null;
    }

    this.setState({
      user          : usuario,
      inputText1Css : inputTextCss
    });

    this.enableDisableButon1();
  	this.enableDisableButon2();
    this.setAnimationToSet(MESSAGE_CONSTANTS.ANIMATION02);
  }

  /**
   * All other fields must be at least 4 characters long to be set with the value entered by the user.
   * If it's set input text to green color, if it's not set it to red color.
   * Calls by default some methods.
   */
  validateInput(e) {
  	let input   = null;
  	let inputId = e.target.id;
    let inputTextCss = MESSAGE_CONSTANTS.FORM_CONTROL;

    if(e.target.value.length > 3) {
      input = e.target.value;
      inputTextCss += " App-bordercolor-lightseagreen";
    } else {
      inputTextCss += " App-bordercolor-red";
    }

		switch(inputId) {
			case MESSAGE_CONSTANTS.TH_COL2:
				this.setState({
					inCharge      : input,
          inputText2Css : inputTextCss
				});
			break;
			case MESSAGE_CONSTANTS.TH_COL3:
				this.setState({
					city          : input,
          inputText3Css : inputTextCss
				});
			break;
			case MESSAGE_CONSTANTS.TH_COL4:
				this.setState({
					state         : input,
          inputText4Css : inputTextCss
				});
			break;
			default: // case MESSAGE_CONSTANTS.PWD:
				this.setState({
					password      : input,
          inputText5Css : inputTextCss
				});
			break;
		}

    this.enableDisableButon1();
    setTimeout(() => {
      this.enableDisableButon2();
    }, 1000);
    this.setAnimationToSet(MESSAGE_CONSTANTS.ANIMATION02);
  }

  /**
   * If any field has text this can be activated
   */
  enableDisableButon1() {
    let isDisabled = true;
    let email      = document.getElementById('email').value;
    let inCharge   = document.getElementById(MESSAGE_CONSTANTS.TH_COL2).value;
    let city       = document.getElementById(MESSAGE_CONSTANTS.TH_COL3).value;
    let state      = document.getElementById(MESSAGE_CONSTANTS.TH_COL4).value;
    let password   = document.getElementById(MESSAGE_CONSTANTS.PWD).value;

    if(email || inCharge || city || state || password) {
      isDisabled = false;
    }
    
    this.setStateButton1(isDisabled);
  }

  /**
   * If all the fields don't meet the requirements:
   *    The "Agregar" button won't be enabled
   */
  enableDisableButon2() {
    let isDisabled = true;

    if(this.state.user && this.state.inCharge && this.state.city && this.state.state && this.state.password) {
      isDisabled = false;
    }
    
    this.setState({
      disabled2: isDisabled
    });
  }

  /**
   * Clear all the input boxes of the modal form-table.
   * Disable the button after cleaning the inpout boxes. 
   */
  clearInputBoxes() {
    const form = document.getElementById("formOfTable");
    form.reset();
    this.setStateButton1(true);
    this.setAnimationToSet(MESSAGE_CONSTANTS.ANIMATION02);
    setTimeout(() => {
      this.resetAllStates();
    }, 500);
  }

  /**
   * Gets the inputs given from the user and persist them in the DB
   */
  addUser() {
    const uid      = this.state.uid;
    const email    = this.state.user;
    const city     = this.state.city;
    const name     = this.state.inCharge;
    const state    = this.state.state;
    const password = this.state.password;

    this.setMessageToDisplay(null);

  	if(email && name && city && state && password) {
      this.setAnimationToSet(MESSAGE_CONSTANTS.ANIMATION01);
  	
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        this.setMessageToDisplay('errorMessage');
      });

      setTimeout(() => {
        if(this.state.messageToDisplay === null) {
          const currentUser = firebase.auth().currentUser.uid;

          firebase.database().ref('bridge/' + currentUser).set({
            redirect_to    : MESSAGE_CONSTANTS.REDIRECT01
          });

          firebase.database().ref('users/' + currentUser).set({
            redirect_to    : MESSAGE_CONSTANTS.REDIRECT02
          });

          firebase.database().ref('users-data/' + uid + '/' + currentUser).set({
            email    : email,
            city     : city,
            name     : name,
            state    : state
          });

          this.setMessageToDisplay('successMessage');
        }
      }, 1500);
    }
  }

  /**
   * There are two main functions we have to do when closing the modal.
   * clearInputBoxes and setMessageToDisplay
   */
  closeModalActions() {
    this.clearInputBoxes();
    this.setMessageToDisplay(null);
  }

  /**
   * Sevaral places are setting disabled1. Therefore was encapsulated.
   */
  setStateButton1(boolean) {
    this.setState({
      disabled1: boolean
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
   * Helps for the animation of the Success or Error message.
   * @param animation - fadeIn or fadeOut
   */
  setAnimationToSet(animation) {
    this.setState({
      animationToSet : animation
    });
  }

  /**
   * Resets all states to the base state form.
   */
  resetAllStates() {
    this.setState({
      user             : null,
      inCharge         : null,
      city             : null,
      state            : null,
      password         : null,
      disabled1        : true,
      disabled2        : true,
      messageToDisplay : null,
      animationToSet   : null,
      inputText1Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText2Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText3Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText4Css    : MESSAGE_CONSTANTS.FORM_CONTROL,
      inputText5Css    : MESSAGE_CONSTANTS.FORM_CONTROL
    });
  }

	render() {
		return(
			<div className="modal-dialog App-fitcontent">

          <div className="modal-content">
            <div className="modal-header navbar navbar-default App-backgroundcolor-green">
              <button type="button" className="close" data-dismiss="modal" onClick={ this.closeModalActions } >&times;</button>
              <h4 className="modal-title">
              	<span className="glyphicon glyphicon-user" /> &nbsp;
              	{ MESSAGE_CONSTANTS.ADD_USER }
              </h4>
            </div>
            <div className="modal-body">

            <form id="formOfTable">
              <table className="table">
                <thead>
                  <tr>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL1 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL2 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL3 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL4 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.PWD } </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> <input type="text" className={ this.state.inputText1Css } id="email" onChange={ this.validateEmail } /> </td>
                    <td> <input type="text" className={ this.state.inputText2Css } id={ MESSAGE_CONSTANTS.TH_COL2 } onChange={ this.validateInput } /> </td>
                    <td> <input type="text" className={ this.state.inputText3Css } id={ MESSAGE_CONSTANTS.TH_COL3 } onChange={ this.validateInput } /> </td>
                    <td> <input type="text" className={ this.state.inputText4Css } id={ MESSAGE_CONSTANTS.TH_COL4 } onChange={ this.validateInput }/> </td>
                    <td> <input type="text" className={ this.state.inputText5Css } id={ MESSAGE_CONSTANTS.PWD } onChange={ this.validateInput }/> </td>
                  </tr>
                </tbody>
              </table>
            </form>

            </div>
            <div className="modal-footer App-height-p5em">
              <div className="row col-lg-12 App-marginbottom-m3 App-margintop-m1">
                <div className="col-lg-3 App-margintop-p1">
                  <button type="button" className="btn btn-info App-marginright-p37" disabled={ this.state.disabled1 } onClick={ this.clearInputBoxes } >
                    <span className="glyphicon glyphicon-tint" />&nbsp;
                    Limpiar
                  </button>
                </div>
                <div className="col-lg-6">
                  <DisplayErrorOrSuccessMessage messageToDisplay={ this.state.messageToDisplay } animationToSet={ this.state.animationToSet } />
                </div>
                <div className="col-lg-3 App-margintop-p1">
                  <button type="button" className="btn btn-info" disabled={ this.state.disabled2 } onClick={ this.addUser }>
                    <span className="glyphicon glyphicon-plus" />&nbsp;
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

      </div>
		);
	}

}

export default Modal;