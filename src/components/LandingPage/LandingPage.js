import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Button, AppBar, Typography } from '@material-ui/core'
import ShoppingMobileImage from '../../assets/images/sho.svg'
import { useHistory, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import ShoppingCart from '../../assets/images/shoppingCart.svg'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        background: '#1f1f1f',
    },
    title: {
        fontSize: '50px',
        color: '#ffffff',
        marginTop: '30px',
        fontFamily: 'monotype corsiva',

        ['@media (min-height:900px)']: {
            fontSize: '80px',
        },
        ['@media (min-height:1200px)']: {
            fontSize: '120px',

        },
    },
    subtitle: {
        fontSize: '14px',
        color: '#f5f5f5',
        width: '50%',
        textAlign: 'center',
        margin: '15px auto',

        ['@media (min-height:900px)']: {
            fontSize: '20px',
        },
        ['@media (min-height:1200px)']: {
            fontSize: '25px',

        },

    },
    image: {
        width: '98%',
        height: 500,
        background: '#1f1f1f',

        ['@media (min-height:500px)']: {
            height: 220
        },
        ['@media (min-height:600px)']: {
            height: 320
        },

        ['@media (min-height:700px)']: {
            height: 420
        },
        ['@media (min-height:800px)']: {
            height: 520
        },

        ['@media (min-height:900px)']: {
            height: 620
        },
        ['@media (min-height:1200px)']: {
            height: 820
        },
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        background: '#1f1f1f'
    },
    signup: {
        background: '#c51162',
        color: '#f5f5f5',
        fontWeight: 'cold',
        margin: '5px auto',
        width: '80%',
        fontSize: '20px'
    },
    login: {
        background: '#1f1f2f',
        color: '#f5f5f5',
        fontWeight: 'cold',
        margin: 'auto',
        width: '60%',
        fontSize: '20px'

    }

})

const LandingPage = props => {
    const history = useHistory()
    const classes = useStyles()
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        if (window.innerWidth >= 1025) {
            console.log('is greater')
            setIsMobile(false)
        }
    }, [])

    let landing = (
        <Grid container className={classes.root}>
            <Grid item className={classes.title}>
                ShoppinWay
        </Grid>
            <Grid item className={classes.subtitle}>
                The best place to find products for you and your loved ones.
        </Grid>
            <Grid item xs container className={classes.image}>
                <img src={ShoppingMobileImage} alt="shoppin" className={classes.img} />
            </Grid>
            <Grid item xs container>
                <Button
                    variant="contained"
                    className={classes.signup}
                    onClick={
                        () => history.push('/signup')
                    }
                >
                    Sign Up
            </Button>
            </Grid>
            <Grid item xs container>
                <Button
                    variant="contained"
                    className={classes.login}
                    onClick={
                        () => history.push('/login')
                    }
                >
                    Log In
            </Button>
            </Grid>
        </Grid>
    )



    if (!isMobile) {
        landing = (
            <Grid container direction="column" justify="center">
                <Grid item xs container direction="column" justify="center">
                    <AppBar position="static"
                        className={classes.navbar}
                        style={{
                            fontSize: '2.2rem',
                            background: '#1d1d1d',
                            boxSizing: 'border-box',
                            minHeight: '10vh',
                            alignItems: 'center'
                        }}>
                        ShoppInWay
                    </AppBar>
                </Grid>
                <Grid item xs container direction="row" justify="center"
                    style={{
                        padding: '15px',
                        minHeight: '90vh',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                    }}
                >
                    <Grid item xs container
                        style={{
                            width: '70%',
                            height: '60%'
                        }}
                    >
                        <Typography
                            style={{
                                width: '100%',
                                height: '80vh',
                                background: '#1f1f2f'
                            }}
                        >
                            <img alt="buycart" src={ShoppingCart}
                                style={{
                                    margin: 'auto',
                                    display: 'block',
                                    maxWidth: '80%',
                                    height: '90%',
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs container direction="column"
                        style={{
                            height: '60%'
                        }}
                    >
                        <Grid item
                            style={{
                                fontSize: '3rem',
                                color: '#f5f5f5',
                                fontFamily: 'monotype corsiva',
                                marginBottom: '20px'
                            }}
                        >
                            ShoppInWay
                        </Grid>
                        <Grid item
                            style={{
                                fontSize: '1rem',
                                color: '#f5f5f5',
                                width: '50%',
                                margin: 'auto',
                                marginBottom: '80px'

                            }}
                        >
                            Your destination to find products for you and your loved ones.
                        </Grid>
                        <Grid item xs container direction="row" justify="center">
                            <Grid item xs={4} container justify="center" >
                                <Button
                                    variant="contained"
                                    style={{
                                        fontSize: '1.2rem',
                                        color: '#f5f5f5',
                                        padding: '5px 45px',
                                        background: '#c51162',
                                        margin: 'auto'
                                    }}
                                    onClick={() => history.push('/login')}
                                >
                                    Log In
                                </Button>
                            </Grid>
                            <Grid item xs={4} container justify="center">
                                <Button
                                    variant="contained"
                                    style={{
                                        fontSize: '1.2rem',
                                        color: '#f5f5f5',
                                        padding: '5px 45px',
                                        background: '#1f1f2f',
                                        margin: 'auto'
                                    }}
                                    onClick={() => history.push('/signup')}

                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }



    if (props.isAuthenticated && props.user !== null) {
        return <Redirect to="/" />;
    } else {
        return landing
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(LandingPage)