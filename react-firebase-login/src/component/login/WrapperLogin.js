import React, { Component } from 'react';
import cookie from 'react-cookie';
import * as firebase from 'firebase';
import HeaderLogin from './HeaderLogin';
import Login from './Login';
import FooterLogin from './FooterLogin';
import CONSTANTS from '../../config/constants.json';

class WrapperLogin extends Component {
	componentWillMount () {
		cookie.remove(CONSTANTS.UID, { path: '/' });
    firebase.auth().signOut();
	}


	render () {
		return (
			<div>
	      <HeaderLogin />
				<Login setWrapperToDisplay={ this.props.setWrapperToDisplay }/>
				<FooterLogin />
			</div>
		);
	}
}

export default WrapperLogin;
