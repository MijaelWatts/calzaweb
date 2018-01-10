import React, { Component } from 'react';
import LoginWrapper from './login/WrapperLogin';
import PanelWrapper from './panel/WrapperPanel';

/**
 * Tells what Component to display in the render method.
 *
 * @props Holds the displayWrapper property.
 */
function WrapperToLoad (props) {
	// TODO: set another option for regular users to be redirected to the catalog.
	if ( props.displayWrapper === 'panel' ) {
    return (<PanelWrapper />);
	} else {
    return (<LoginWrapper setWrapperToDisplay={ props.setWrapperToDisplay }/>);
	}
}

class Wrapper extends Component {
	constructor (props) {
		super(props);

		this.state = {
			displayWrapper : 'login'
		}
	}

	/**
	 * If argument is true setState to 'panel'.
	 * Otherwise left it in 'login'.
	 *
	 * @argument Boolean
	 */
	setWrapperToDisplay (argument) {
		let componentName = 'login';

		if (argument) {
			componentName = 'panel';
		}

		this.setState({
			displayWrapper : componentName
		});
	}


	render () {
		return (
			<div>
				<WrapperToLoad
					setWrapperToDisplay={ this.setWrapperToDisplay.bind(this) }
					displayWrapper={ this.state.displayWrapper } />
			</div>
		);
	}
}

export default Wrapper;
