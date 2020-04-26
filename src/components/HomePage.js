import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Grid } from '@material-ui/core'

import Cards from './Cards/Cards'
import MiniDrawer from '../UI/MiniDrawer/MiniDrawer'
import Spinner from '../UI/Spinner/Spinner'
import HomePageSkeleton from '../UI/HomePageSkeleton/HomePageSkeleton'

import { getProducts, getUserProfileDetails } from '../store/actions/index'


const HomePage = props => {

    useEffect(() => {
        props.getUserProfileDetails()
        if (props.products === null || props.products === [])
            props.getProducts()
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
                    <MiniDrawer >
                        {props.products ?
                            (
                                props.products.length === 0 ?
                                    'No products'
                                    :
                                    <Cards key={props.products} products={props.products} />
                            )
                            :
                            <Grid container justify="space-evenly" >
                                {Array(9).fill().map((arr, index) =>
                                    <HomePageSkeleton key={index} />
                                )}
                            </Grid>
                        }
                    </MiniDrawer>


            }
        </Grid>
    )

}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.auth.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        getUserProfileDetails: () => dispatch(getUserProfileDetails()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)