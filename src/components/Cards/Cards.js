import React, { useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import { Grid } from '@material-ui/core'
import Card from './Card/Card'

import { connect } from 'react-redux'

import Spinner from '../../UI/Spinner/Spinner'
import { products } from '../../dump/products'
import { useHistory } from 'react-router-dom'

import {
    SET_CART,
    getCartProducts,
    getCurrentBuyProduct,
    getDetailProduct
} from '../../store/actions/index'

const Cards = props => {
    const history = useHistory()

    useEffect(() => {
    }, [])

    const handleAddToCart = productId => {
        const cart = [...props.cart]
        if (cart.indexOf(productId.toString()) === -1) {
            cart.push(productId.toString())
        } else {
            cart.splice(cart.indexOf(productId.toString()), 1)
        }
        props.setCart(cart)
    }

    const showMoreDetails = productId => {
        props.setDetailProduct(productId)
        history.push('/details')
    }

    const checkInCart = productId => {
        if (props.cart.indexOf(productId.toString()) !== -1) {
            return true
        }
        return false
    }

    const handleBuyProduct = productId => {
        props.setCurrentBuyProduct(productId)
        history.push('/buynow')
    }

    return (
        <>

            <Grid container direction="row" justify="space-evenly"
                style={{ marginTop: '10px' }}
            >
                {
                    props.products ?
                        props.products.map(product =>
                            <LazyLoad
                                key={product.id + 'lazy'}
                                height={100}
                                offset={[-100, 100]}
                                placeholder={<Spinner />}
                            >

                                <Card
                                    key={product.id}
                                    product_title={product.product_title}
                                    product_subtitle={product.product_subtitle}
                                    product_rating={product.product_rating}
                                    product_description={product.product_description}
                                    product_image={product.product_image}
                                    isAddedToCart={checkInCart(product.id)}
                                    handleAddToCart={() => handleAddToCart(product.id)}
                                    handleBuyProduct={() => handleBuyProduct(product.id)}
                                    showMoreDetails={() => showMoreDetails(product.id)}

                                />
                            </LazyLoad>
                        )
                        :
                        <Spinner />
                }
            </Grid>

        </>
    )
}



const mapStateToProps = state => {
    return {
        currentDetailProduct: state.products.currentDetailProduct,
        cart: state.products.cart,
        loading: state.products.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCart: (cart) => dispatch({ type: SET_CART, cart: cart }),
        setDetailProduct: (productId) => dispatch(getDetailProduct(productId)),
        setCurrentBuyProduct: (productId) => dispatch(getCurrentBuyProduct(productId)),
        getCartProducts: (cart) => dispatch(getCartProducts(cart))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)