import React, {Component} from 'react';
import VersionConstants from '../component/VersionConstants';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import VERSIONS from '../config_files/versions.json';
import logo_calzaweb_mini from '../img/logo-calzaweb-mini.png'

function FooterInfo(props) {
	const versionNumber = VersionConstants.VERSIONS[0].version; // TODO: Change this

	return(
		<div className="App-textalign-center animated fadeIn">
			<img src={ logo_calzaweb_mini } alt="calzaweb" />
			<br />
			<a href="#" onClick={ props.toggleFlag }> {MESSAGE_CONSTANTS.VERSION} { versionNumber }</a>
		</div>
	);
}

function Panel(props) {
	console.log("props: ", props);

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

function Version() {
	// const version = VersionConstants.VERSIONS;
	const version = VERSIONS;

	const versions = version.map( (version, index) =>
		<Panel key={ index } panel={ VersionConstants.VERSIONS[index] } />
	);

	return(
		<div className="animated fadeIn">
			<h2> { MESSAGE_CONSTANTS.VERSIONS_INFO } </h2>
			<hr />
			{ versions }
		</div>
	);
}

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
