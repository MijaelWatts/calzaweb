import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import Header from './react_component/Header';
import Register from './react_component/Register';
import Footer from './react_component/Footer';
//import 'jquery/dist/jquery.js'
//import 'jquery-ui-npm/jquery-ui.js'
// import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import CONSTANTS from './config_files/constants.json'

function WrapComponents() {
	let userId = cookie.load(CONSTANTS.UID);

	if(userId) {
		return(
	    <div>
	      <Header userId={userId}/>
	      <Register userId={userId}/>
	      <Footer />
	    </div>
	  );
	} else {
		window.location.href = CONSTANTS.HREF1;
		return(null);
	}
}

ReactDOM.render(
  <WrapComponents />,
  document.getElementById('root')
);
