import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Wrapper from './component/Wrapper';
import NotFound from './component/NotFound';
import CONSTANTS from './config/constants.json';
import './css/index.css';

firebase.initializeApp(CONSTANTS.FIREBASE);

let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

function WrapComponents() {

    if (isChrome) {
      return(
        <div>
          <Wrapper />
        </div>
      );
    } else {
      return (
        <div>
          <NotFound />
        </div>
      );
    }

}

ReactDOM.render(
  <WrapComponents />,
  document.getElementById('root')
);
