import React, { Component } from 'react';
import cookie from 'react-cookie';
import Login from './Login';
import Panel from './Panel';

/**
 * Tells what Component to display in the render method.
 *
 * @props Holds the displayComponent property.
 */
function ComponentToLoad (props) {
	if ( props.displayComponent === 'panel' ) {
		let userId = cookie.load('userId');
		
		return (<Panel userId={userId} />);
	} else {
		return (<Login setComponentToDisplay={ props.setComponentToDisplay } />);
	}
}

class Wrapper extends Component {
	constructor (props) {
		super(props);

		this.state = {
			displayComponent : 'login'
		}
	}

	/**
	 * If argument is true setState to 'panel'.
	 * Otherwise left it in 'login'.
	 *
	 * @argument Boolean 
	 */
	setComponentToDisplay (argument) {
		let componentName = 'login';

		if (argument) {
			componentName = 'panel';
		}

		this.setState({
			displayComponent : componentName
		});
	}


	render () {
		return (
			<ComponentToLoad 
				setComponentToDisplay={ this.setComponentToDisplay.bind(this) } 
				displayComponent={ this.state.displayComponent } />
		);
	}
}

export default Wrapper;