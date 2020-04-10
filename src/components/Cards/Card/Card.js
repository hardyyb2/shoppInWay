
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LazyLoad from 'react-lazyload'

import DefaultImage from '../../../assets/images/noimg.png'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 405,
        minWidth: 405,
        background: '#1f1f2d',
        margin: '5px',
        ['@media (max-width: 850px)']: {
            width: '300px',
            minWidth: '300px',

        },

        ['@media (max-width: 650px)']: {
            width: '400px',
            minWidth: '400px',

        },
        ['@media (max-width: 450px)']: {
            width: '350px',
            minWidth: '350px',

        },
        ['@media (max-width: 350px)']: {
            width: '300px',
            minWidth: '300px',

        }
    },
    media: {
        height: 0,
        paddingTop: '100%',
        backgroundColor: 'black' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'black'
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 'bolder',
        color: '#f5f5f5'
    },
    subheader: {
        color: 'rgba(255,255,255,0.6)'

    },
    desc: {
        color: 'rgba(255,255,255,0.8)'

    }
}));
const ProductCard = props => {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardHeader

                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.product_rating || ''}
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        style={{ color: '#f5f5f5' }}
                        onClick={() => {

                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                classes={{
                    title: classes.title,
                    subheader: classes.subheader
                }}
                title={props.product_title || ''}
                subheader={props.product_subtitle || ''}
            />
            <LazyLoad
                once={true}
                placeholder={<CardMedia
                    className={classes.media}
                    image={DefaultImage}
                    title={props.product_title || ''}
                />}
            >
                <CardMedia
                    className={classes.media}
                    image={props.product_image || DefaultImage}
                    title={props.product_title || ''}
                    onClick={() => {
                        props.showMoreDetails()
                    }}
                />
            </LazyLoad>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
                    {props.product_description || '(No Description Available)'}
                </Typography>
            </CardContent>
            <CardActions style={{
                justifyContent: 'space-between',

            }}>
                <Button
                    aria-label="add to favorites"
                    onClick={props.handleAddToCart}
                    style={{
                        fontWeight: 'bold',

                        background: ((props.isAddedToCart) ? '#f5f5f5' : 'rgba(59,75,105,0.8)'),
                        color: ((props.isAddedToCart) ? 'rgba(59,75,105,0.8)' : '#f5f5f5'),

                    }}
                    startIcon={<ShoppingCartIcon />}
                >
                    {props.isAddedToCart ? 'Remove' : 'Add To Cart'}
                </Button>
                <Button
                    aria-label="add to favorites"
                    startIcon={<AttachMoneyIcon />}
                    variant="contained"
                    style={{
                        fontWeight: 'bold',
                        background: '#c51162',
                        color: 'rgba(255,255,255,0.9)'
                    }}
                    onClick={props.handleBuyProduct}
                >
                    Buy Now
                </Button>

            </CardActions>

        </Card >
    );
}

export default ProductCard