import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Header from './component/Header';
import BodyWrapper from './component/body/Wrapper';
import Footer from './component/Footer';
import CONSTANTS from './config/constants.json';
import './css/index.css';

firebase.initializeApp(CONSTANTS.FIREBASE);

function WrapComponents() {
  return(
    <div>
      <Header />
      <BodyWrapper />
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <WrapComponents />,
  document.getElementById('root')
);
