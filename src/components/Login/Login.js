import React, { useState } from 'react'
import {
    Grid, Paper, TextField,
    Button, makeStyles, AppBar,

} from '@material-ui/core'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { loginUser } from "../../store/actions/index"
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({

    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        minHeight: '100vh',
        margin: 'auto',
        background: '#1f1f1f',
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        borderRadius: '10px',
    },
    input: {
        color: '#f5f5f5',
        borderBottom: '1px solid #f5f5f5',

    },
    label: {
        color: '#f5f5f5 !important',
    },

})

const Login = props => {
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = e => {
        e.preventDefault()
        props.setLogin(email, password)
    }

    const login = (
        <Paper elevate={5} className={classes.root}>
            <Grid container direction="column" className={classes.container}>
                <AppBar position="static"
                    style={{
                        padding: '20px',
                        fontSize: '2.4rem',
                        background: '#1d1d1d',
                        fontFamily: 'monotype corsiva'
                    }}
                    onClick={
                        () => history.replace('/index')
                    }
                >
                    ShoppInWay
                </AppBar>
                <Grid item style={{ margin: '10px', padding: '10px' }}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth value={email}
                        id="login-email"
                        label="Email"
                        error={props.loginError}
                        helperText={(props.loginError) ? 'Email or password incorrect' : ' '}
                        placeholder="Email..."
                        InputProps={{
                            className: classes.input,

                        }}
                        InputLabelProps={{
                            className: classes.label,
                        }}
                    />
                </Grid>
                <Grid item style={{ margin: '10px', padding: '10px' }}>
                    <TextField
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        error={props.loginError}
                        helperText={(props.loginError) ? 'Email or password incorrect' : ' '}
                        fullWidth
                        value={password}
                        id="login-password"
                        label="Password"
                        placeholder="Password..."
                        InputProps={{
                            className: classes.input,

                        }}
                        InputLabelProps={{
                            className: classes.label,
                        }}
                    />
                </Grid>
                <Grid item style={{ margin: '10px' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        style={{
                            background: ((props.isLoggingIn) ? '#1f2f2f' : '#1f1f2f'),
                            color: '#f5f5f5',
                            fontSize: '1.2rem'
                        }}
                    >
                        {
                            props.isLoggingIn ? 'Please Wait..' : 'Login'
                        }
                    </Button>
                </Grid>
                <Grid item style={{ margin: '10px' }}>
                    <Button
                        fullWidth
                        size="small"
                        onClick={
                            () => history.push('/signup')
                        }
                        style={{
                            color: '#f5f5f5',
                            textTransform: 'lowercase'
                        }}
                    >
                        Sign up instead
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )

    if (props.isAuthenticated && props.user !== null) {
        return <Redirect to="/" />
    }
    else {
        return login
    }


}

const mapStateToProps = state => {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: (email, password) => dispatch(loginUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)