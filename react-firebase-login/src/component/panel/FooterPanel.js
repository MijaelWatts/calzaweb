import React, {Component} from 'react';
import logo_calzaweb_mini from '../../img/logo-calzaweb-mini.png'

class Footer extends Component {
	render() {
	  return(
			<div className="App-textalign-center App-margintop-p1">
				<img src={logo_calzaweb_mini} alt="calzaweb" />
				<br />
				<a href="#"> Versión 0.1.0 </a>
			</div>
	  );
  }
}

export default Footer;
