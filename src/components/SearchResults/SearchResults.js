import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'
import Cards from '../Cards/Cards'
import HomePageSkeleton from '../../UI/HomePageSkeleton/HomePageSkeleton'
import Empty from '../../assets/images/NoProducts.svg'

import { getSearchResults } from '../../store/actions/index'

const useStyles = makeStyles(theme => ({
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
    }
}))


const SearchProducts = props => {
    const classes = useStyles()

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
        <MiniDrawer >
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
                                <Grid container direction="column" justify="center" container style={{ marginTop: '10px', alignItems: 'center' }}>
                                    <Grid item container className={classes.image}>
                                        <img src={Empty} alt="emptycart" className={classes.img} />
                                    </Grid>
                                    <Grid item style={{ color: '#f5f5f5', fontSize: '2rem' }}>
                                        No Products
                            </Grid>
                                </Grid>
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