import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'
import Cards from '../Cards/Cards'
import HomePageSkeleton from '../../UI/HomePageSkeleton/HomePageSkeleton'

import { getSearchResults } from '../../store/actions/index'

const SearchProducts = props => {

    useEffect(() => {
        let searchItem = props.location.pathname.split('/searchResults/')

        const getSearchProduct = async () => {
            await props.getSearchResults(searchItem[1])
        }
        let find = props.searchText ?

            (searchItem[1].toLowerCase() !== props.searchText.toLowerCase() ?
                getSearchProduct()
                : null
            )
            : null


    }, [props.searchText])
    return (
        <MiniDrawer>
            {
                props.searchLoading ?
                    (
                        <Grid container justify="space-evenly" >
                            {Array(4).fill().map((arr, index) =>
                                <HomePageSkeleton key={index} />
                            )}
                        </Grid>
                    )
                    :
                    (props.searchProducts ?
                        (
                            props.searchProducts.length === 0 ?
                                'No products'
                                :
                                <Cards key={props.searchProducts} products={props.searchProducts} />
                        )
                        :
                        <Redirect to={'/'} />

                    )
            }
        </MiniDrawer>

    )
}

const mapStateToProps = state => {
    return {
        searchLoading: state.products.searchLoading,
        searchProducts: state.products.searchProducts,
        searchText: state.products.searchText
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSearchResults: (searchText) => dispatch(getSearchResults(searchText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts)