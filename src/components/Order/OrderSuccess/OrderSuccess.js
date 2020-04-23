import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PurchaseSuccess from '../../assets/images/purchaseSuccessful.svg'

import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        paddingTop: '100px'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        background: '#1f1f2a',
        ['@media (max-width:800px)']: {
            width: 600
        },
        ['@media (max-width:650px)']: {
            width: 400
        },

        ['@media (max-width:470px)']: {
            width: 300
        }
    },
    image: {
        width: 308,
        height: 308,
        ['@media (max-width:650px)']: {
            width: 390
        },

        ['@media (max-width:470px)']: {
            width: 290
        },
        margin: 'auto'
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
        fontSize: '1.5rem',
        color: 'rgba(255,255,255,0.7)'
    },
}));

const OrderSuccess = props => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} >
                    <Grid item style={{ background: '#1a1a1a', margin: 'auto' }}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="success" src={PurchaseSuccess} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} justify="center">
                            <Grid item container justify="center" style={{ alignItems: 'center' }}>
                                <Typography gutterBottom variant="subtitle1" className={classes.title}>
                                    Thank You
                                 </Typography>
                                <Typography variant="body2" gutterBottom className={classes.subtitle}>
                                    Your Purchase Was Successfull
                                 </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justify="center" style={{ marginTop: '20px' }}>
                    <Button
                        aria-label="add to favorites"
                        variant="contained"
                        style={{
                            fontWeight: 'bold',
                            padding: '10px',
                            background: '#c51162',
                            color: 'rgba(255,255,255,0.9)'
                        }}

                        onClick={() => {
                            history.replace('/')
                        }}
                        fullWidth
                    >
                        Find More Amazing Products
                    </Button>
                </Grid>
            </Paper>
        </div>
    )
}

export default OrderSuccess