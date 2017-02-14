import React, {Component} from 'react';
import VersionConstants from '../component/VersionConstants';
import GralConstants from '../component/GralConstants';
import logo_calzaweb_mini from '../img/logo-calzaweb-mini.png'

function FooterInfo(props) {
	const versionNumber = VersionConstants.VERSIONS[0].version;

	return(
		<div className="App-textalign-center">
			<img src={logo_calzaweb_mini} alt="calzaweb" />
			<br />
			<a href="#" onClick={ props.toggleFlag }> {GralConstants.VERSION_WORD} { versionNumber }</a>
		</div>
	);
}

function Panel(props) {
	const description = props.panel.description;
	const descriptions = description.map( (description, index) =>
		<li key={ index }> { description } </li>
	);

	return(
		<div className="App-padding-leftright-p2">
			<div className="panel panel-default">
				<div className="panel-heading App-backgroundcolor-green">
					<h2 className="panel-title App-color-black"> {GralConstants.VERSION_WORD} {props.panel.version} </h2>
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
	const version = VersionConstants.VERSIONS;
	const versions = version.map( (version, index) =>
		<Panel key={ index } panel={ VersionConstants.VERSIONS[index] } />
	);

	return(
		<div>
			<h2> {GralConstants.VERSIONS_INFO_WORD} </h2>
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
			<div className="App-margintop-p5">
				<FooterInfo toggleFlag={ this.toggleFlag } />
				<HideOrShowVersion flag={ this.state.flag } />
			</div>
	    );
  	}
}

export default Footer;
