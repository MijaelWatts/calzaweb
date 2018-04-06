import React, { Component } from 'react';
import cookie from 'react-cookie';
import HeaderPanel from './HeaderPanel';
import Panel from './Panel';
import FooterPanel from './FooterPanel';

class WrapperUsersRegistration extends Component {
	constructor (props) {
		super(props);

		this.state = {
			userId : cookie.load('userId')
		}
	}

	render () {
		return (
			<div>
				<HeaderPanel userId={ this.state.userId } />
				<Panel userId={ this.state.userId } />
				<FooterPanel />
			</div>
		);
	}
}

export default WrapperUsersRegistration;
