import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LazyLoad from 'react-lazyload'

import DefaultImage from '../../../assets/images/noimg.png'

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    root: {
        maxWidth: 405,
        minWidth: 405,
        background: '#1f1f2d',
        margin: '5px',
        ['@media (max-width: 850px)']: {
            width: '300px',
            minWidth: '300px',

        },

        ['@media (max-width: 720px)']: {
            width: '400px',
            minWidth: '400px',

        },
        ['@media (max-width: 500px)']: {
            width: '330px',
            minWidth: '330px',

        },

        ['@media (max-width: 450px)']: {
            width: '300px',
            minWidth: '300px',

        },
        ['@media (max-width: 350px)']: {
            width: '250px',
            minWidth: '250px',
        }
    },
    media: {
        height: 0,
        paddingTop: '100%',
        backgroundColor: 'black',
        cursor: 'pointer' // 16:9
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
        backgroundColor: '#121212'
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 'bolder',
        color: '#f5f5f5',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxWidth: '100%',
    },
    subheader: {
        color: 'rgba(255,255,255,0.6)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxWidth: '80%',
    },
    desc: {
        color: 'rgba(255,255,255,0.8)'

    }
}));

const Media = (props) => {
    const { loading } = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    ) : (
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {props.product_rating || <Skeleton />}
                            </Avatar>
                        )
                }
                action={
                    loading ? null : (
                        <IconButton
                            aria-label="settings"
                            style={{ color: '#f5f5f5' }}
                            onClick={() => {

                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    ) : (
                            props.product_title
                        )
                }
                subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : props.product_subtitle}
            />
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : (
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
                )}

            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
                            {props.product_description || '(No Description Available)'}
                        </Typography>
                    )}
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

        </Card>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default Media