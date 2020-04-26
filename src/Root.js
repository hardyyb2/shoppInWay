import React, { lazy, Suspense } from 'react'


import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Grid } from '@material-ui/core';

import Spinner1 from './UI/Spinner1/Spinner1'

const HomePage = lazy(() => import('./components/HomePage'))
const Details = lazy(() => import('./components/Details/Details'))
const BuyNow = lazy(() => import('./components/BuyNow/BuyNow'))
const OrderSuccess = lazy(() => import('./components/Order/OrderSuccess/OrderSuccess'))
const Signup = lazy(() => import('./components/Signup/Signup'))
const Login = lazy(() => import('./components/Login/Login'))
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'))
const Address = lazy(() => import('./components/Usercomponents/UserAddressesContainer/UserAddressesContainer'))
const UserProfile = lazy(() => import('./components/Usercomponents/UserProfile/UserProfile'))
const SearchResults = lazy(() => import('./components/SearchResults/SearchResults'))
const OrderSummary = lazy(() => import('./components/Order/OrderSummary/OrderSummary'))
const DeliveryAddress = lazy(() => import('./components/DeliveryAddress/DeliveryAddress'))
const Cart = lazy(() => import('./components/Cart/Cart'))
const BuyCart = lazy(() => import('./components/BuyCart/BuyCart'))


const LoadingScreen = (
    <Grid container justify="center"
        style={{
            minWidth: '100vw',
            minHeight: '100vh',
            color: '#f5f5f5',
            alignItems: 'center'
        }}>

        <Spinner1 />


    </Grid>
)

const Root = props => {
    const { location } = props

    return (
        <Wrapper>

            <Switch location={location}>
                <Suspense fallback={LoadingScreen}>
                    <ProtectedRoute
                        exact
                        key='searchResults'
                        path="/searchResults/:id"
                        component={SearchResults}
                        isAuthenticated={props.isAuthenticated}
                        isVerifying={props.isVerifying}
                    />


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
                        key='ordersummary'
                        path="/ordersummary"
                        component={OrderSummary}
                        isAuthenticated={props.isAuthenticated}
                        isVerifying={props.isVerifying}
                    />
                    <ProtectedRoute
                        exact
                        key='deliveryaddress'
                        path='/deliveryaddress'
                        component={DeliveryAddress}
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
                </Suspense>
            </Switch>

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