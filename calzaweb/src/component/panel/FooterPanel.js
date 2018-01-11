import React, {Component} from 'react';
import logo_calzaweb_mini from '../../img/logo-calzaweb-mini.png'

class Footer extends Component {
	render() {
		const pStyle = {
			color: 'dodgerblue'
		};

	  return(
			<div className="App-textalign-center App-margintop-p1">
				<img src={logo_calzaweb_mini} alt="calzaweb" />
				<br />
				<p style={pStyle}> Versión 0.1.0 </p>
			</div>
	  );
  }
}

export default Footer;
