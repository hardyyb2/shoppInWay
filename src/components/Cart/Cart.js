import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Cards from '../Cards/Cards'
import EmptyCart from '../../assets/images/emptyCart.svg'

import Spinner from '../../UI/Spinner/Spinner'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'
import HomePageSkeleton from '../../UI/HomePageSkeleton/HomePageSkeleton'

import { connect } from 'react-redux'


import { SET_CART } from '../../store/actions/index'
import { getCartProducts } from '../../store/actions/index'

const useStyles = makeStyles({
    image: {
        width: 300,
        height: 400,
        background: '#1f1f2f'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
})

const CartProducts = props => {
    const classes = useStyles()

    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
    }, [])

    return (
        <MiniDrawer>
            <Grid container>
                {
                    !props.loading ?
                        (
                            props.localCartProducts.length !== 0 ?
                                <Cards
                                    products={props.localCartProducts}
                                />
                                :
                                <Grid container direction="column" justify="center" container style={{ marginTop: '10px', alignItems: 'center' }}>
                                    <Grid item container className={classes.image}>
                                        <img src={EmptyCart} alt="emptycart" className={classes.img} />
                                    </Grid>
                                    <Grid item style={{ color: '#f5f5f5', fontSize: '2rem' }}>
                                        Your Cart is empty
                                    </Grid>
                                </Grid>
                        )
                        :
                        <Grid container justify="center" >
                            {
                                Array(4).fill().map((arr, index) =>
                                    <HomePageSkeleton key={index} />)
                            }
                        )
                        </Grid>
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
        localCartProducts: state.products.localCartProducts,
        loading: state.products.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCart: (cart) => dispatch({ type: SET_CART, cart: cart }),
        getCartProducts: (cart) => dispatch(getCartProducts(cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProducts)