import React, { useState, useEffect, Component } from 'react'
import {
    Grid, makeStyles,
    Typography, Paper, ButtonBase,
    Button, IconButton
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ImageModal from '../Modal/ImageModal'

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { SET_CURRENT_BUY_PRODUCT } from '../../store/actions/index'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
    },
    paper: {
        padding: '10px',
        margin: 'auto',
        width: '90%',
        background: '#1f1f2a'

    },
    image: {
        width: 400,
        height: 600,
        ['@media (max-width: 500px)']: {
            width: '350px',
            height: '500px',

        }
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    title: {
        fontSize: '2.6rem',
        color: 'rgba(255,255,255,0.9)'
    },
    subtitle: {
        fontSize: '1.8rem',
        color: 'rgba(255,255,255,0.7)'
    },
    desc: {
        width: '70%',
        margin: 'auto',
        color: 'rgba(255,255,255,0.7)'

    },
    price: {
        marginTop: '15px',
        padding: '8px 15px',
        fontSize: '2rem',
        color: 'rgba(255,255,255,1)'
    }
})

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartProducts: [],
            isAddedToCart: false,
            showImage: false
        }
    }
    checkInCart = productId => {
        console.log('product id ', productId, this.state.cartProducts)
        if (this.state.cartProducts.indexOf(productId.toString()) !== -1) {
            console.log('added to cRT')
            this.setState({ isAddedToCart: true })
        } else {
            console.log('not addeds')
            this.setState({ isAddedToCart: false })
        }

    }

    handleAddToCart = productId => {
        const cart = JSON.parse(localStorage.getItem('cartProducts'))
        if (cart.indexOf(productId.toString()) === -1) {
            cart.push(productId.toString())
        } else {
            cart.splice(cart.indexOf(productId.toString()), 1)
        }
        localStorage.setItem('cartProducts', JSON.stringify(cart))
        this.setState({ cartProducts: cart })
        this.checkInCart(this.props.currentDetailProduct.id)
    }


    componentDidMount() {
        //set cart products
        console.log('ran')
        if (JSON.parse(localStorage.getItem('cartProducts')).length !== 0) {
            const cart = JSON.parse(localStorage.getItem('cartProducts'))
            this.setState({ cartProducts: cart }, () => {
                this.checkInCart(this.props.currentDetailProduct.id)
            })
        }
    }

    render() {
        const { classes } = this.props
        return (

            <Grid container style={{ marginTop: '40px', background: '#181a1b', minHeight: '100vh', alignItems: 'center' }} >
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center" style={{ alignItems: 'center' }} spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image} onClick={() => this.setState({ showImage: true })}>
                                    <img className={classes.img} alt="complex" src={this.props.currentDetailProduct.product_image} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" className={classes.title}>
                                            {this.props.currentDetailProduct.product_title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom className={classes.subtitle}>
                                            {this.props.currentDetailProduct.product_subtitle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" className={classes.desc}>
                                            {this.props.currentDetailProduct.product_description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" className={classes.price}>
                                            ${this.props.currentDetailProduct.product_price.toFixed(2)}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs container spacing={3} direction="row" justify="center">
                                        <Grid item>
                                            <Button
                                                aria-label="add to favorites"
                                                onClick={() => this.handleAddToCart(this.props.currentDetailProduct.id)}
                                                style={{
                                                    fontWeight: 'bold',
                                                    padding: '10px',
                                                    background: ((this.state.isAddedToCart) ? '#f5f5f5' : 'rgba(59,75,105,0.8)'),
                                                    color: ((this.state.isAddedToCart) ? 'rgba(59,75,105,0.8)' : '#f5f5f5'),
                                                }}
                                                startIcon={<ShoppingCartIcon />}
                                            >
                                                {this.state.isAddedToCart ? 'Remove' : 'Add To Cart'}
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                aria-label="add to favorites"
                                                startIcon={<AttachMoneyIcon />}
                                                variant="contained"
                                                style={{
                                                    fontWeight: 'bold',
                                                    padding: '10px',
                                                    background: '#c51162',
                                                    color: 'rgba(255,255,255,0.9)'
                                                }}
                                                onClick={() => {
                                                    this.props.setCurrentBuyProduct(this.props.currentDetailProduct)
                                                    this.props.history.push('/buynow')
                                                }}
                                            >
                                                Buy Now
                                      </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Paper>
                    {
                        this.state.showImage ?
                            (
                                <ImageModal
                                    handleClose={
                                        () => { this.setState({ showImage: false }) }
                                    } >

                                    <img
                                        className={classes.img}
                                        alt="complex"
                                        src={this.props.currentDetailProduct.product_image}
                                    />
                                </ImageModal>
                            )
                            :
                            null
                    }
                </div>
            </Grid>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentDetailProduct: state.currentDetailProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentBuyProduct: (product) => dispatch({ type: SET_CURRENT_BUY_PRODUCT, product: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Details)))