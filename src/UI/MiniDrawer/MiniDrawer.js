import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    makeStyles, useTheme, Button, fade, Drawer, AppBar, Toolbar,
    List, CssBaseline, Typography, IconButton, Divider, ListItem,
    ListItemText, Badge, ListItemIcon, InputBase, ExpansionPanel,
    ExpansionPanelSummary, ExpansionPanelDetails

} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import Logout from '../../Logout/Logout'

import { getCartProducts, getUserProfileDetails } from '../../store/actions/index'

import SlideDownAnimation from '../SlideDownAnimation/SlideDownAnimation'

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
    },
    dividerColor: {
        backgroundColor: '#121212'
    },
    search: {
        position: 'relative',
        marginRight: '10px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    rightAppBar: {
        position: 'absolute',
        display: 'flex',
        right: '5px',
        ['@media (max-width:660px)']: {
            display: 'none'
        }
    },
    appbarCart: {
        ['@media (max-width:800px)']: {
            display: 'none'
        }
    },
    smallScreenSearch: {
        position: 'absolute',
        right: '10px',
        color: '#f5f5f5',
        fontWeight: 'bolder',
        ['@media (min-width:660px)']: {
            display: 'none'
        }

    },
    smallScreenSearchBar: {
        position: 'absolute',
        background: '#1f1f1f',
        padding: '12px 50px 22px 60px',
        left: 0,
        display: 'inline-block',
        width: '100%',
        top: '100%',
        ['@media (min-width:660px)']: {
            display: 'none'
        }
    }

}))

const MiniDrawer = props => {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()
    const location = useLocation()
    const [showSmallScreenSearch, setShowSmallScreenSearch] = useState(false)
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
                            position: 'absolute',
                            left: '40%',
                            cursor: 'pointer'
                        }}
                        onClick={() => history.push('/')}
                    >
                        ShoppInWay
                      </Typography>
                    <div className={classes.rightAppBar}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                autoFocus
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>

                        <Button color="inherit"
                            className={classes.appbarCart}
                            startIcon={
                                props.cart ?
                                    <Badge badgeContent={props.cart.length} color="secondary" >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    :
                                    <ShoppingCartIcon />
                            }
                            onClick={() => checkLocation()}
                        >Cart</Button>
                    </div>

                    <SlideDownAnimation isVisible={showSmallScreenSearch} >
                        <div className={classes.smallScreenSearchBar} >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>

                        </div>
                    </SlideDownAnimation>


                    {showSmallScreenSearch ?

                        <IconButton
                            className={classes.smallScreenSearch}
                            onClick={() => setShowSmallScreenSearch(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        :
                        <IconButton
                            className={classes.smallScreenSearch}
                            onClick={() => setShowSmallScreenSearch(true)}
                        >
                            <SearchIcon />
                        </IconButton>
                    }

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
                    {/* home */}
                    <ListItem button key="home"
                        onClick={() => {
                            history.push('/')
                        }}
                    >
                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                    <Divider classes={{ root: classes.dividerColor }} />

                    {/* Open cart */}
                    <ListItem button key="cart"
                        onClick={() => {
                            checkLocation()
                        }}
                    >
                        <ListItemIcon style={{
                            color: '#f5f5f5'
                        }}>
                            {props.cart ?
                                <Badge badgeContent={props.cart.length} color="secondary" >
                                    <ShoppingCartIcon />
                                </Badge>
                                :
                                <ShoppingCartIcon />
                            }
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

                    <Divider classes={{ root: classes.dividerColor }} />

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