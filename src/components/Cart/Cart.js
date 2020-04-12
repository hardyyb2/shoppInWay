import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Cards from '../Cards/Cards'

import Spinner from '../../UI/Spinner/Spinner'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'

import { connect } from 'react-redux'

import { db } from '../../firebase/firebase'

import { SET_CART, SET_LOCAL_CART_PRODUCTS } from '../../store/actions/index'
import { getCartProducts } from '../../store/actions/index'

const CartProducts = props => {
    const [cart, setCart] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        props.getCartProducts(props.cart)

    }, [])

    return (
        <MiniDrawer>
            <Grid container>
                {
                    props.localCartProducts ?
                        (
                            <Cards
                                products={props.localCartProducts}
                            />
                        )
                        :
                        'no dsakdkjansdhjashdas'
                }
                {
                    notFound ?
                        <Grid container justify="center"
                            style={{ fontSize: '1.5rem', color: '#f5f5f5' }} >
                            No CartProducts Yet
                    </Grid>
                        :
                        null
                }
            </Grid>
        </MiniDrawer>
    )

}

const mapStateToProps = state => {
    return {
        cart: state.products.cart,
        localCartProducts: state.products.localCartProducts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCart: (cart) => dispatch({ type: SET_CART, cart: cart }),
        getCartProducts: (cart) => dispatch(getCartProducts(cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProducts)