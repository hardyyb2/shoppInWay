import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        background: '#1f1f2d',
    },

    image: {
        width: 128,
        height: 128,
        ['@media (max-width:620px)']: {
            width: '400px',
            height: '500px',

        },
        ['@media (max-width:450px)']: {
            width: '300px',
            height: '400px',

        },
        ['@media (max-width:360px)']: {
            width: '250px',
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
        color: 'rgba(255,255,255,0.9)'
    },
    subtitle: {
        color: 'rgba(255,255,255,0.7)'
    },
    price: {
        marginTop: '15px',
        padding: '8px 15px',
        fontSize: '2rem',
        color: 'rgba(255,255,255,1)'
    }

}));


const CurrentProductCard = props => {

    const classes = useStyles()
    return (
        <Paper className={classes.paper} >
            <Grid container >
                <Grid item style={{ margin: 'auto' }}>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={props.currentBuyProduct.product_image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" >
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" className={classes.title}>
                                {props.currentBuyProduct.product_title}
                            </Typography>
                            <Typography variant="body2" gutterBottom className={classes.subtitle}>
                                {props.currentBuyProduct.product_subtitle}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" className={classes.price}>
                                ${props.currentBuyProduct.product_price.toFixed(2)}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProductCard)