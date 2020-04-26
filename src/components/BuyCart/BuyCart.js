import React, { useEffect } from 'react';
import { makeStyles, Grid, Button } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import CurrentCartProducts from './CurrentCartProducts/CurrentCartProducts'

import MiniDrawer from '../../UI/MiniDrawer/MiniDrawer'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const BuyCart = props => {
    const classes = useStyles();
    const history = useHistory()

    const removeAndGoBack = () => {
        history.goBack()
    }

    const handleProceed = () => {
        history.push('/deliveryaddress')
    }

    return (
        <MiniDrawer >
            <div className={classes.root} >
                {
                    props.localCartProducts.map((product, index) =>
                        <CurrentCartProducts
                            currentCartProduct={product}
                            key={index}
                        />
                    )
                }
                <Grid container justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Grid item>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={removeAndGoBack}
                            style={{
                                fontWeight: 'bold',
                                background: 'rgba(59,75,105,0.8)',
                                color: '#f5f5f5',
                                marginRight: '10px'
                            }}
                        >
                            Go Back
                </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            startIcon={<AttachMoneyIcon />}
                            variant="contained"
                            style={{
                                fontWeight: 'bold',
                                background: '#c51162',
                                color: 'rgba(255,255,255,0.9)',
                            }}
                            onClick={handleProceed}
                        >
                            Proceed
                      </Button>

                    </Grid>
                </Grid>
            </div >
        </MiniDrawer>
    )
}

const mapStateToProps = state => {
    return {
        localCartProducts: state.products.localCartProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyCart)