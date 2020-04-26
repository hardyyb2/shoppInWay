import React from 'react'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'

const Orderrow = props => {
    return (
        <Grid container justify="center" style={{ padding: '8px 0px' }} >
            <Grid item xs style={{ textTransform: 'lowercase' }}><i>{props.productName}</i></Grid>
            <Grid item xs><i>${props.productPrice}</i></Grid>
        </Grid>
    )
}

const Ordertable = props => {
    let totalPrice = 0

    return (
        <Grid container >
            <Grid container justify="center" style={{ fontSize: '1.5rem', textTransform: 'capitalize', border: '0.1px solid #f5f5f5', padding: '5px 0px' }}>
                Final List
            </Grid>


            {
                props.finalProducts ?
                    props.finalProducts.map((product, index) => {
                        totalPrice += product.product_price
                        return < Orderrow key={index} productName={product.product_title} productPrice={product.product_price} />
                    })
                    :
                    null
            }
            <Grid container style={{ fontSize: '1.5rem', fontWeight: 'bolder' }}>
                <Grid item xs>Total</Grid>
                <Grid item xs>${totalPrice}</Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordertable)