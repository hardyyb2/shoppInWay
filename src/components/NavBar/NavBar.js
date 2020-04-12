import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation()

    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        if (location.pathname.trim() === '/index' || location.pathname.trim() === '/login' || location.pathname.trim() === '/signup') {
            setShowCart(false)
        } else {
            setShowCart(true)
        }
    })

    const checkLocation = () => {
        if (location.pathname.trim() === '/cart') {
            //do nothing
        } else {
            history.push('/cart')
        }
    }

    let navbar = (
        <div className={classes.root}>
            <AppBar position="fixed" style={{ background: '#1f1f1f' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}
                        onClick={() => { history.push('/') }}
                        style={{
                            cursor: 'pointer'
                        }}
                    >
                        ShopPinWay
                </Typography>
                    <Button color="inherit"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => checkLocation()}
                    >Cart</Button>
                </Toolbar>
            </AppBar>
        </div>

    )

    if (showCart) {
        return navbar
    } else {
        return null
    }
}