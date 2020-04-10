import React, { useState, useRef } from 'react';
import { makeStyles, Grid, Button } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import fs from 'fs'

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

import CurrentProductCard from './CurrentProductCard/CurrentProductCard'
import DetailsForm from './DetailsForm/DetailsForm'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }

}));

const BuyNow = props => {
    const classes = useStyles();
    const history = useHistory()
    const myRef = useRef(null)

    const [showForm, setShowForm] = useState(false)

    const removeAndGoBack = () => {
        history.goBack()
    }

    const handleProceed = () => {
        setShowForm(true)
        handleScroll()

    }
    const handleScroll = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleDeliveryOptions = (details) => {
        // for now just order page
        console.log(details)
        // fs.appendFile('../../dump/orders.txt', '', function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });

        history.push('/ordersuccess')

    }



    return (
        <div className={classes.root} style={{ background: '#181a1b', minHeight: '100vh', paddingTop: '100px' }}>
            <CurrentProductCard />
            <Grid container justify="center" style={{ marginTop: '20px' }}>
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
            {
                showForm ?
                    <DetailsForm
                        handleDeliveryOptions={(details) => handleDeliveryOptions(details)}
                    />
                    :
                    null
            }

            <div ref={myRef}>
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        currentBuyProduct: state.currentBuyProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyNow)