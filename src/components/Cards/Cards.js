import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { Grid } from '@material-ui/core'
import Card from './Card/Card'

import { connect } from 'react-redux'

import Spinner from '../../UI/Spinner/Spinner'
import { products } from '../../dump/products'
import * as actionTypes from '../../store/actions'
import { useHistory } from 'react-router-dom'

const Cards = props => {
    const [cartProducts, setcartProducts] = useState([])
    const history = useHistory()

    useEffect(() => {
        //clear details product
        // if (props.currentDetailProduct !== null) {
        //     props.setDetailProduct(null)
        // }
        //set cart products
        if (localStorage.getItem('cartProducts') !== null) {
            const cart = JSON.parse(localStorage.getItem('cartProducts'))
            setcartProducts(cart)
        }
    }, [])

    const handleAddToCart = productId => {
        const cart = JSON.parse(localStorage.getItem('cartProducts'))
        if (cart.indexOf(productId.toString()) === -1) {
            cart.push(productId.toString())
        } else {
            cart.splice(cart.indexOf(productId.toString()), 1)
        }
        localStorage.setItem('cartProducts', JSON.stringify(cart))
        setcartProducts(cart)
    }

    const showMoreDetails = productId => {
        const product = products.find(product => product.id === productId)
        props.setDetailProduct(product)
        history.push('/details')
    }

    const checkInCart = productId => {
        if (cartProducts.indexOf(productId.toString()) !== -1) {
            return true
        }
        return false
    }

    const handleBuyProduct = productId => {
        const product = products.find(product => product.id === productId)
        props.setCurrentBuyProduct(product)
        history.push('/buynow')
    }

    return (
        <>

            <Grid container direction="row" justify="space-evenly"
                style={{ marginTop: '80px' }}
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
        currentDetailProduct: state.currentDetailProduct
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setDetailProduct: (product) => dispatch({ type: actionTypes.SET_DETAIL_PRODUCT, product: product }),
        setCurrentBuyProduct: (product) => dispatch({ type: actionTypes.SET_CURRENT_BUY_PRODUCT, product: product })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)