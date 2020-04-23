import React from 'react'
import HomePage from './components/HomePage'
import Cart from './components/Cart/Cart'
import Details from './components/Details/Details'
import BuyNow from './components/BuyNow/BuyNow'
import OrderSuccess from './components/OrderSuccess/OrderSuccess'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import LandingPage from './components/LandingPage/LandingPage'
import Address from './components/Usercomponents/UserAddressesContainer/UserAddressesContainer'
import UserProfile from './components/Usercomponents/UserProfile/UserProfile'

import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import BuyCart from './components/BuyCart/BuyCart'



const Root = props => {
    const { location } = props

    return (
        <Wrapper>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 200, exit: 200 }}
                    classNames={'fade'}
                >

                    <Switch location={location}>
                        <ProtectedRoute
                            exact
                            key='ordersuccess'
                            path="/ordersuccess"
                            component={OrderSuccess}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />

                        <ProtectedRoute
                            exact
                            key='address'
                            path='/address'
                            component={Address}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />
                        <ProtectedRoute
                            exact
                            key='buynow'
                            path="/buynow/:id"
                            component={BuyNow}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />
                        <ProtectedRoute
                            exact
                            key='details'
                            path="/details/:id"
                            component={Details}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />

                        <ProtectedRoute
                            exact
                            key='cart'
                            path="/cart"
                            component={Cart}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />

                        <ProtectedRoute
                            exact
                            key='profile'
                            path='/profile'
                            component={UserProfile}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />

                        <ProtectedRoute
                            exact
                            key='home'
                            path='/'
                            component={HomePage}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />
                        <ProtectedRoute
                            exact
                            key='buycart'
                            path='/buycart'
                            component={BuyCart}
                            isAuthenticated={props.isAuthenticated}
                            isVerifying={props.isVerifying}
                        />
                        <Route exact key="index" path='/index' component={LandingPage} />
                        <Route exact key="login" path='/login' component={Login} />
                        <Route exact key="signup" path='/signup' component={Signup} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper>

    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying
    };
}

const Wrapper = styled.div`
      .fade-enter {
          opacity: 0.01;
            transform: scale(0.8);
      }
      .fade-enter.fade-enter-active {
          opacity: 1;
          transform: scale(1);

          transition: all 200ms ease-in;
      }
      .fade-exit {
          opacity: 1;
          transform: scale(1);
        }
        
      .fade-exit.fade-exit-active {
          opacity: 0.01;
          transform: scale(0.8);
          transition: all 200ms ease-in;
      }
      div.transition-group {
        position: relative;
      }
      section.route-section {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }
  `;

export default connect(mapStateToProps)(withRouter(Root));