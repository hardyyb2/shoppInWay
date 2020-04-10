import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'

import NavBar from './NavBar/NavBar'
import Cards from './Cards/Cards'
import { products } from '../dump/products'


const HomePage = props => {

    useEffect(() => {
        if (!localStorage.getItem('cartProducts')) {
            localStorage.setItem('cartProducts', JSON.stringify([]))
        }
        //if there set redux store
    })

    return (
        <Grid container >
            <Cards products={products} />
        </Grid>
    )

}
export default HomePage