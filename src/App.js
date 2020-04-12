import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Root from './Root'
import NavBar from './components/NavBar/NavBar'


const App = props => {
  return (
    <div className="App" style={{ background: '#1f1f1f', minHeight: '100vh' }}>
      <BrowserRouter>
        <NavBar />
        <Root />
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}


export default connect(mapStateToProps)(App);