import React, { Component } from 'react';
import HeaderLogin from './login/HeaderLogin';
import FooterLogin from './login/FooterLogin';
import '../css/App.css';
import image from '../img/error-img.png';

function OnlyChrome () {
  return(
    <div className="App content">
			<img src={ image } alt="chrome" />
      <br /><br />
      <p className="App-intro">
        Este sitio funciona unicamente con el explorador de Google Chrome.
      </p>
      <p className="App-intro">
        <a href="https://www.google.es/chrome/browser/desktop/index.html"> Descargar Google Chrome </a>
      </p>
 		</div>
  );
}

class NotFound extends Component {
  render() {
    return (
      <div>
        <HeaderLogin />
        <OnlyChrome />
        <FooterLogin />
      </div>
    );
  }
}

export default NotFound;
