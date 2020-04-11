import React from 'react';
import './App.css';
import HomePage from './components/HomePage'
import Cart from './components/Cart/Cart'
import Details from './components/Details/Details'
import NavBar from './components/NavBar/NavBar'
import BuyNow from './components/BuyNow/BuyNow'
import OrderSuccess from './components/OrderSuccess/OrderSuccess'

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {
  return (
    <div className="App" style={{ background: '#121212' }}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <ProtectedRoute
            exact
            key='ordersuccess'
            path="/ordersuccess"
            component={OrderSuccess}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            key='buynow'
            path="/buynow"
            component={BuyNow}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            key='details'
            path="/details"
            component={Details}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />

          <ProtectedRoute
            exact
            key='cart'
            path="/cart"
            component={Cart}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />

          <ProtectedRoute
            exact
            key='cart'
            path='/'
            component={HomePage}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <Route key="login" path='/login' component={Login} />
        </Switch>
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