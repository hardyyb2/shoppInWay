import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { connect } from 'react-redux'
import {
    getcurrentCartProduct
} from '../../../store/actions/index'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: '8px',
        maxWidth: 600,
        flexGrow: 1,
        background: '#1f1f2d',
        ['@media (max-width:725px)']: {
            width: 500
        },
        ['@media (max-width:620px)']: {
            width: 450
        },
        ['@media (max-width:601px)']: {
            width: 400
        },
        ['@media (max-width:501px)']: {
            width: 300
        },
        ['@media (max-width:480px)']: {
            width: 260
        }

    },

    image: {
        width: 128,
        height: 128,
        ['@media (max-width:601px)']: {
            width: 100,
            height: 100
        }

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

    title: {
        color: 'rgba(255,255,255,0.9)',

    },
    subtitle: {
        color: 'rgba(255,255,255,0.7)'
    },
    price: {
        marginTop: '15px',
        padding: '8px 15px',
        fontSize: '2rem',
        color: 'rgba(255,255,255,1)',
        ['@media (max-width:601px)']: {
            fontSize: '1.3rem'
        }

    },
    wave: {
        '&::after': {
            background: `linear-gradient(90deg, transparent, #444 , transparent)`,
        }
    }

}));


const CurrentCartProducts = props => {

    const classes = useStyles()

    useEffect(() => { }, [])


    return (
        <Paper className={classes.paper} >
            <Grid container >
                <Grid item style={{ margin: 'auto' }}>
                    {
                        !props.loading ?
                            (props.currentCartProduct ?
                                (
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={props.currentCartProduct.product_image} />
                                    </ButtonBase>
                                )
                                :
                                null
                            )

                            :
                            <Skeleton variant="rect" animation="wave" classes={{ wave: classes.wave }} className={classes.image} />
                    }
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" >
                        {!props.loading ?
                            (props.currentCartProduct ?
                                (<Grid item xs>

                                    <Typography gutterBottom variant="subtitle1" className={classes.title}>
                                        {props.currentCartProduct.product_title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom className={classes.subtitle}>
                                        {props.currentCartProduct.product_subtitle}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" className={classes.price}>
                                        ${props.currentCartProduct.product_price.toFixed(2)}
                                    </Typography>
                                </Grid>
                                )

                                :
                                null
                            )


                            :
                            <Grid item xs >
                                <Skeleton variant="rect" animation="wave" classes={{ wave: classes.wave }} className={classes.title} />
                                <Skeleton variant="rect" animation="wave" classes={{ wave: classes.wave }} className={classes.subtitle} />
                                <Skeleton variant="rect" animation="wave" classes={{ wave: classes.wave }} className={classes.price} />
                            </Grid>
                        }


                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CurrentCartProducts