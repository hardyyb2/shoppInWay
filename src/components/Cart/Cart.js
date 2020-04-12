import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Cards from '../Cards/Cards'

import Spinner from '../../UI/Spinner/Spinner'
import { products } from '../../dump/products'

import NavBar from '../NavBar/NavBar'


const CartProducts = props => {
    const [cart, setCart] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('cartProducts') !== null) {
                const data = JSON.parse(localStorage.getItem('cartProducts'))
                const productIdArray = await data.map(productId => parseInt(productId))
                const resultantArray = products.filter(product => {
                    if (productIdArray.indexOf(product.id) !== -1) {
                        return product
                    }
                })
                let cartData = []
                if (resultantArray.length === 0) {
                    setNotFound(true)
                } else {
                    setNotFound(false)
                    resultantArray.map(product =>
                        cartData.push(product)
                    )
                    setCart(cartData)
                }

            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Grid container>
                {
                    cart ?
                        (
                            <Cards
                                products={cart}
                            />
                        )
                        :
                        <Spinner />
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
        </>
    )

}

export default CartProducts