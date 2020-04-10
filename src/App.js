import React from 'react';
import './App.css';
import HomePage from './components/HomePage'
import Cart from './components/Cart/Cart'
import Details from './components/Details/Details'
import NavBar from './components/NavBar/NavBar'
import BuyNow from './components/BuyNow/BuyNow'
import OrderSuccess from './components/OrderSuccess/OrderSuccess'

import { Route, Switch, BrowserRouter } from "react-router-dom";



function App() {
  return (
    <div className="App" style={{ background: '#121212' }}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route key="ordersuccess" path='/ordersuccess' component={OrderSuccess} />
          <Route key="buynow" path='/buynow' component={BuyNow} />
          <Route key="details" path='/details' component={Details} />
          <Route key="cart" path='/cart' component={Cart} />
          <Route key="home" path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
