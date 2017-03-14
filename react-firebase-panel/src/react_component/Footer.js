import React, {Component} from 'react';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import VERSIONS from '../config_files/versions.json';
import logo_calzaweb_mini from '../img/logo-calzaweb-mini.png'

/**
 * Display the latest version in which the app is
 * When clicking on it; details of all the versions is shown.
 */
function FooterInfo(props) {
	return(
		<div className="App-textalign-center animated fadeIn">
			<img src={ logo_calzaweb_mini } alt="calzaweb" />
			<br />
			<a href="#" onClick={ props.toggleFlag }> { MESSAGE_CONSTANTS.VERSION } { VERSIONS[0].version }</a>
		</div>
	);
}

/**
 * Display in the DOM specific info for each version built
 */
function Panel(props) {
	const description = props.panel.description;
	
	const descriptions = description.map( (description, index) =>
		<li key={ index }> { description } </li>
	);

	return(
		<div className="App-padding-leftright-p2 animated fadeInLeft">
			<div className="panel panel-default">
				<div className="panel-heading App-backgroundcolor-green">
					<h2 className="panel-title App-color-black"> { MESSAGE_CONSTANTS.VERSION } {props.panel.version} </h2>
				</div>
				<div className="panel-body">
					<ul>
						{ descriptions }
					</ul>
				</div>
			</div>
		</div>
	);
}

/**
 * Display in the DOM all the information from each version that was build.
 * Uses the info of the app from VERSIONS constant.
 * All the info is mapped throught the map() function and send to a JSX.
 * 	Once gotten, the JSX response is hold into versions constant and put as an expression inside our return.
 */
function Version() {
	const version = VERSIONS;

	const versions = version.map( (version, index) =>
		<Panel key={ index } panel={ VERSIONS[index] } />
	);

	return(
		<div className="animated fadeInLeft">
			<h2> { MESSAGE_CONSTANTS.VERSIONS_INFO } </h2>
			<hr />
			{ versions }
		</div>
	);
}

/**
 * Based on the property gotten, it will hide or show the versions that the app holds.
 */
function HideOrShowVersion(props) {
	if(props.flag) {
		return <Version />
	} else {
		return null;
	}
}

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			flag : false
		})

		this.toggleFlag = this.toggleFlag.bind(this);
	}

	/**
	 * This state is in control of showing or hiding details of the versions of the app. 
	 */
	toggleFlag() {
		this.setState({
			flag : !this.state.flag
		})
	}

	render() {
    return(
			<div>
				<FooterInfo toggleFlag={ this.toggleFlag } />
				<HideOrShowVersion flag={ this.state.flag } />
			</div>
    );
	}
}

export default Footer;
