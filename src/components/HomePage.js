import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Grid } from '@material-ui/core'

import Cards from './Cards/Cards'
import MiniDrawer from '../UI/MiniDrawer/MiniDrawer'
import Spinner from '../UI/Spinner/Spinner'

import { getProducts } from '../store/actions/index'


const HomePage = props => {
    useEffect(() => {
        if (props.products === null) {
            props.getProducts()
        }
    }, [])

    return (
        <Grid container >
            {
                props.loading ?
                    <Grid item xs container justify="center"
                        style={{
                            margin: '150px 0px 150px 0px',
                            color: '#f5f5f5'
                        }}
                    >
                        <Spinner />

                    </Grid>
                    // spinner later
                    :
                    props.products ?
                        (
                            props.products.length === 0 ?
                                'No products'
                                :

                                <MiniDrawer >
                                    <Cards key={props.products} products={props.products} />
                                </MiniDrawer>

                        )
                        :
                        null
            }
        </Grid>
    )

}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)