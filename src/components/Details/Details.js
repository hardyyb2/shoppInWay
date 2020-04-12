import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography, Paper, ButtonBase,
    Button,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ImageModal from '../Modal/ImageModal'

import { connect } from 'react-redux'
import { SET_CURRENT_BUY_PRODUCT, SET_CART } from '../../store/actions/index'
import { useHistory } from 'react-router-dom'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'

const styles = theme => ({
    root: {
        flexGrow: 1,
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

const Details = props => {

    const { classes } = props
    const history = useHistory()

    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [showImage, setShowImage] = useState(false)



    const checkInCart = productId => {
        if (props.cart.indexOf(productId.toString()) !== -1) {
            setIsAddedToCart(true)
        } else {
            setIsAddedToCart(false)
        }
    }

    useEffect(() => {
        checkInCart(props.currentDetailProduct.id)
    }, [props.cart])

    const handleAddToCart = productId => {
        let newCart = [...props.cart]
        console.log(productId)
        if (props.cart.indexOf(productId.toString()) === -1) {
            newCart.push(productId.toString())
        } else {
            newCart.splice(newCart.indexOf(productId.toString()), 1)
        }
        props.setCart(newCart)
    }


    if (props.currentDetailProduct) {
        return (
            <MiniDrawer>
                <Grid container style={{
                    background: '#181a1b', alignItems: 'center'
                }} >
                    <div className={classes.root
                    } >
                        <Paper className={classes.paper}>
                            <Grid container justify="center" style={{ alignItems: 'center' }} spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image} onClick={() => setShowImage(true)}>
                                        <img className={classes.img} alt="complex" src={props.currentDetailProduct.product_image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column">
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" className={classes.title}>
                                                {props.currentDetailProduct.product_title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom className={classes.subtitle}>
                                                {props.currentDetailProduct.product_subtitle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" className={classes.desc}>
                                                {props.currentDetailProduct.product_description}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" className={classes.price}>
                                                ${props.currentDetailProduct.product_price.toFixed(2)}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs container spacing={3} direction="row" justify="center">
                                            <Grid item>
                                                <Button
                                                    aria-label="add to favorites"
                                                    onClick={() => handleAddToCart(props.currentDetailProduct.id)}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        padding: '10px',
                                                        background: ((isAddedToCart) ? '#f5f5f5' : 'rgba(59,75,105,0.8)'),
                                                        color: ((isAddedToCart) ? 'rgba(59,75,105,0.8)' : '#f5f5f5'),
                                                    }}
                                                    startIcon={<ShoppingCartIcon />}
                                                >
                                                    {isAddedToCart ? 'Remove' : 'Add To Cart'}
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
                                                        props.setCurrentBuyProduct(props.currentDetailProduct)
                                                        history.push('/buynow')
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
                            showImage ?
                                (
                                    <ImageModal
                                        handleClose={
                                            () => { setShowImage(false) }
                                        } >

                                        <img
                                            className={classes.img}
                                            alt="complex"
                                            src={props.currentDetailProduct.product_image}
                                        />
                                    </ImageModal>
                                )
                                :
                                null
                        }
                    </div>
                </Grid>
            </MiniDrawer >
        )
    } else {
        return 'no detail products'
    }
}


const mapStateToProps = state => {
    return {
        currentDetailProduct: state.products.currentDetailProduct,
        cart: state.products.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCart: (cart) => dispatch({ type: SET_CART, cart: cart }),
        setCurrentBuyProduct: (product) => dispatch({ type: SET_CURRENT_BUY_PRODUCT, product: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Details))