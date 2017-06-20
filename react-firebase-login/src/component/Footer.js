import React, {Component} from 'react';
import logo_calzaweb_mini from '../img/logo-calzaweb-mini.png'

class Footer extends Component {
	render() {
	  return(
			<div className="App-textalign-center App-margintop-p1">
				<img src={logo_calzaweb_mini} alt="calzaweb" />
			</div>
	  );
  }
}

export default Footer;
