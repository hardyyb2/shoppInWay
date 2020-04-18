import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Button } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';

import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { logoutUser } from '../../store/actions/index'
import Logout from '../../Logout/Logout'

import { getCartProducts, getUserProfileDetails } from '../../store/actions/index'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#1f1f1f',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#1f1f2f',
        boxShadow: '0px 0px 12px 0px #121212'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        boxShadow: '0px 0px 6px 0px #121212',
        background: '#1d1d2d'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        margin: 'auto',

    },
    list: {
        color: '#f5f5f5',
        border: 'none',
        outline: 'none'
    }
}))

const MiniDrawer = props => {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()
    const location = useLocation()

    const [showLogout, setShowLogout] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const checkLocation = () => {
        if (location.pathname.trim() === '/cart') {
            //do nothing
        } else {
            props.getCartProducts(props.cart)
            history.push('/cart')
        }
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ background: '#1f1f1f' }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap
                        style={{
                            margin: 'auto',
                            cursor: 'pointer'
                        }}
                        onClick={() => history.push('/')}
                    >
                        ShoppInWay
                      </Typography>
                    <Button color="inherit"
                        startIcon={
                            <Badge badgeContent={props.cart.length} color="secondary" >
                                <ShoppingCartIcon />
                            </Badge>
                        }
                        onClick={() => checkLocation()}
                    >Cart</Button>

                </Toolbar>

            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}


            >
                <div className={classes.toolbar}
                >
                    <IconButton onClick={handleDrawerClose}
                        style={{
                            color: '#f5f5f5'
                        }}
                    >
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <List className={classes.list}>

                    {/* Open cart */}
                    <ListItem button key="cart"
                        onClick={() => {
                            history.push('/cart')
                        }}
                    >
                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            <Badge badgeContent={props.cart.length} color="secondary" >
                                <ShoppingCartIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="My Cart" />
                    </ListItem>

                    {/* add address button */}
                    <ListItem button key="address"
                        onClick={() => {
                            if (location.pathname.trim() === '/address') { }
                            else
                                history.push('/address')
                        }}
                    >

                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Address" />
                    </ListItem>

                    {/*profile  */}
                    <ListItem button key="profile"
                        onClick={() => {
                            props.getUserDetails()
                            history.push('/profile')
                        }}
                    >

                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    {/* logout user button */}
                    <ListItem button key="logout"
                        onClick={() => {
                            setShowLogout(true)
                        }}
                    >

                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>



                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
                {
                    showLogout ?
                        <Logout handleClose={() => setShowLogout(false)} />
                        :
                        null
                }
            </main>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        cart: state.products.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartProducts: (cart) => dispatch(getCartProducts(cart)),
        getUserDetails: () => dispatch(getUserProfileDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer)