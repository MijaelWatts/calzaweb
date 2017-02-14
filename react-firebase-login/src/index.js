import React from 'react';
import ReactDOM from 'react-dom';
import Header from './react_component/Header';
import Login from './react_component/Login';
import Footer from './react_component/Footer';
import './css/index.css';

function WrapComponents() {
  return(
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <WrapComponents />,
  document.getElementById('root')
);
