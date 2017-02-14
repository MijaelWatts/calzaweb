import React, {Component} from 'react';
import * as firebase from 'firebase';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';

class Modal extends Component {
	constructor(props) {
		super(props);
		let currentUser = firebase.auth().currentUser;
		console.log("Modal currentUser: ", currentUser);

		this.state = ({
			userId   : props.userId,
			user     : null,
			inCharge : null,
			city     : null,
			state    : null,
			password : null,
      disabled : true
		});

		this.validateEmail      = this.validateEmail.bind(this);
    this.enableDisableButon = this.enableDisableButon.bind(this);
    this.validateInput      = this.validateInput.bind(this);
    this.addUser            = this.addUser.bind(this);
	}

	/**
   * User must be a valid email address.
   * Calls by default enbleDisableButton method.
   */
  validateEmail(e) {
    let usuario = null;
    // eslint-disable-next-line
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isTheEmailValid = regexp.test(e.target.value);
    
    isTheEmailValid ? (usuario = e.target.value) : (usuario = null);

    this.setState({
      user : usuario
    });

  	this.enableDisableButon();
  }

  /**
   * All other fields must be at least 4 characters long to be set with the value entered by the user.
   * Calls by default enbleDisableButton method.
   */
  validateInput(e) {
  	let input   = null;
  	let inputId = e.target.id;

    (e.target.value.length > 3) ? (input = e.target.value) : (input = null);

		switch(inputId) {
			case MESSAGE_CONSTANTS.TH_COL3:
				this.setState({
					inCharge : input
				});
			break;
			case MESSAGE_CONSTANTS.TH_COL4:
				this.setState({
					city : input
				});
			break;
			case MESSAGE_CONSTANTS.TH_COL5:
				this.setState({
					state : input
				});
			break;
			default: // case MESSAGE_CONSTANTS.TH_COL8:
				this.setState({
					password : input
				});
			break;
		}

    this.enableDisableButon();
  }

  /**
   * If all the fields don't meet the requirements:
   *    The "Agregar" button won't be enabled
   */
  enableDisableButon() {
    let isDisabled = true;

    if(this.state.user && this.state.inCharge && this.state.city && this.state.state && this.state.password) {
      isDisabled = false;
    }
    
    this.setState({
      disabled: isDisabled
    });
  }

  /**
   * Gets the inputs given from the user and persist them in the DB
   */
  addUser() {
    console.log(this.state.userId + " && " + this.state.user + " && " + this.state.inCharge + " && " + this.state.city + " && " + this.state.state + " && " + this.state.password);

  	if(this.state.userId && this.state.user && this.state.inCharge && this.state.city && this.state.state && this.state.password) {
  	
      firebase.auth().createUserWithEmailAndPassword(this.state.user, this.state.password).catch(function(error) {
        // TODO: If error display an error within the modal
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          alert('Password demasiado debil.');
        } else {
          alert(errorMessage);
        }
      });

      setTimeout(function() {
      	let currentUser = firebase.auth().currentUser;
				console.log("Modal currentUser2: ", currentUser.uid);

				firebase.database().ref('bridge/' + currentUser.uid).set({
			    redirect_to    : MESSAGE_CONSTANTS.REDIRECT01
			  });

				firebase.database().ref('users/' + currentUser.uid).set({
			    redirect_to    : MESSAGE_CONSTANTS.REDIRECT02
			  });

				// TODO: persist the data in the DB
	      firebase.database().ref('users-data/' + currentUser.uid).set({
			    email    : '',
			    accessed : '',
			    city     : '',
			    name     : '',
			    state    : ''
			  });
      }, 3000);

    }
  }

	render() {
		return(
			<div className="modal-dialog App-fitcontent">

          <div className="modal-content">
            <div className="modal-header navbar navbar-default App-backgroundcolor-green">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">
              	<span className="glyphicon glyphicon-user" /> &nbsp;
              	{ MESSAGE_CONSTANTS.ADD_USER }
              </h4>
            </div>
            <div className="modal-body">

              <table className="table">
                <thead>
                  <tr>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL2 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL3 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL4 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL5 } </th>
                    <th className="App-textalign-center"> { MESSAGE_CONSTANTS.TH_COL8 } </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> <input type="text" className="form-control" onChange={ this.validateEmail } /> </td>
                    <td> <input type="text" className="form-control" id={ MESSAGE_CONSTANTS.TH_COL3 } onChange={ this.validateInput } /> </td>
                    <td> <input type="text" className="form-control" id={ MESSAGE_CONSTANTS.TH_COL4 } onChange={ this.validateInput } /> </td>
                    <td> <input type="text" className="form-control" id={ MESSAGE_CONSTANTS.TH_COL5 } onChange={ this.validateInput }/> </td>
                    <td> <input type="text" className="form-control" id={ MESSAGE_CONSTANTS.TH_COL8 } onChange={ this.validateInput }/> </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" data-dismiss="modal" disabled={this.state.disabled} onClick={ this.addUser }>
              	<span className="glyphicon glyphicon-plus" />&nbsp;
              	Agregar
              </button>
            </div>
          </div>

      </div>
		);
	}

}

export default Modal;