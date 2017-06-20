import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
// import Header from './component/Header';
import Wrapper from './component/body/Wrapper';
import Footer from './component/Footer';
import CONSTANTS from './config/constants.json';
import './css/index.css';

firebase.initializeApp(CONSTANTS.FIREBASE);

function WrapComponents() {
  return(
    <div>
      <Wrapper />
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <WrapComponents />,
  document.getElementById('root')
);
