import React, {Component} from 'react';
import logo_calzaweb_mini from '../img/logo-calzaweb-mini.png'

class Footer extends Component {
	render() {
	  return(
			<div className="App-textalign-center">
				<img src={logo_calzaweb_mini} className="App-margintop-p1" alt="calzaweb" />
			</div>
	  );
  }
}

export default Footer;
