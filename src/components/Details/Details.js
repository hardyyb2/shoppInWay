import React, { useState, useEffect } from 'react'
import {
    Grid, makeStyles,
    Typography, Paper, ButtonBase,
    Button,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ImageModal from '../Modal/ImageModal'
import DetailsPageSkeleton from '../../UI/DetailsPageSkeleton/DetailsPageSkeleton'

import { connect } from 'react-redux'
import {
    SET_CURRENT_BUY_PRODUCT, SET_CART,
    getDetailProduct
} from '../../store/actions/index'
import { useHistory } from 'react-router-dom'


import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'

const styles = makeStyles({
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
        height: 500,
        ['@media (max-width: 500px)']: {
            width: '350px',
            height: '500px',

        },
        ['@media (max-width: 450px)']: {
            width: '300px',
            height: '400px',

        },
        ['@media (max-width: 400px)']: {
            width: '240px',
            height: '300px',

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
        color: 'rgba(255,255,255,0.9)',
        ['@media (max-width: 500px)']: {
            fontSize: '2rem',

        },
        ['@media (max-width: 450px)']: {
            fontSize: '1.7rem',

        },
        ['@media (max-width: 400px)']: {
            fontSize: '1.4rem',

        }
    },
    subtitle: {
        fontSize: '1.8rem',
        color: 'rgba(255,255,255,0.7)',
        ['@media (max-width: 500px)']: {
            fontSize: '1.3rem',

        },
        ['@media (max-width: 450px)']: {
            fontSize: '1rem',

        },
        ['@media (max-width: 400px)']: {
            fontSize: '0.8rem',

        }
    },
    desc: {
        width: '70%',
        margin: 'auto',
        color: 'rgba(255,255,255,0.7)',
        ['@media (max-width: 500px)']: {
            fontSize: '1rem',

        },
        ['@media (max-width: 450px)']: {
            fontSize: '0.8rem',

        },
        ['@media (max-width: 400px)']: {
            fontSize: '0.6rem',

        }
    },
    price: {
        marginTop: '15px',
        padding: '8px 15px',
        fontSize: '2rem',
        color: 'rgba(255,255,255,1)',
        ['@media (max-width: 500px)']: {
            fontSize: '1.7rem',

        },
        ['@media (max-width: 450px)']: {
            fontSize: '1.3rem',

        },
        ['@media (max-width: 400px)']: {
            fontSize: '1rem',

        }

    }
})

const Details = props => {

    const classes = styles()
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
        let detailItem = props.location.pathname.split('/details/')

        const getDetailProduct = async () => {
            console.log('running get details product')
            await props.setDetailProduct(detailItem[1])
        }
        if (detailItem[1] !== props.currentDetailProduct.id)
            getDetailProduct()

        if (props.currentDetailProduct) {
            checkInCart(props.currentDetailProduct.id)
        }
    }, [])

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


    return (
        <MiniDrawer>

            {
                props.loading ?
                    <DetailsPageSkeleton />
                    :
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
                                                <Grid item >
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
                                                            history.push(`/buynow/${props.currentDetailProduct.id}`)
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


            }
        </MiniDrawer >
    )

}


const mapStateToProps = state => {
    return {
        currentDetailProduct: state.products.currentDetailProduct,
        cart: state.products.cart,
        loading: state.products.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCart: (cart) => dispatch({ type: SET_CART, cart: cart }),
        setCurrentBuyProduct: (product) => dispatch({ type: SET_CURRENT_BUY_PRODUCT, product: product }),
        setDetailProduct: (productId) => dispatch(getDetailProduct(productId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)