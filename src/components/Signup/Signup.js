import React, { useState } from 'react'
import {
    Grid, Paper, TextField,
    Button, makeStyles, AppBar,

} from '@material-ui/core'


import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signupUser } from "../../store/actions/";
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

        ['@media (min-width:760px)']: {
            width: '60%'
        }

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

const SignUp = props => {
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSignUp = e => {
        e.preventDefault()
        const { dispatch } = props;

        dispatch(signupUser(email, password));

    }

    const signup = (<Paper elevate={5} className={classes.root}>
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
                    onChange={e => setEmail(e.target.value)}
                    fullWidth value={email}
                    error={props.signupError}
                    helperText={props.signupError ? props.signupErrMessage : ' '}
                    id="login-email"
                    label="Email"
                    placeholder="Email..."
                    InputProps={{
                        className: classes.input,

                    }}
                    InputLabelProps={{
                        className: classes.label,
                    }} />
            </Grid>
            <Grid item style={{ margin: '10px', padding: '10px' }}>
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    error={props.signupError}
                    helperText={props.signupError ? props.signupErrMessage : ' '}
                    fullWidth
                    value={password}
                    id="login-password"
                    label="Password" placeholder="Password..."
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
                    style={{
                        background: '#c51162',
                        color: 'white'
                    }}
                    size="large"
                    onClick={handleSignUp}
                >
                    SignUp
                    </Button>
            </Grid>
            <Grid item style={{ margin: '10px' }}>
                <Button
                    fullWidth
                    size="small"
                    onClick={
                        () => history.push('/login')
                    }
                    style={{
                        color: '#f5f5f5',
                        textTransform: 'lowercase'
                    }}
                >
                    Log In Instead
                    </Button>
            </Grid>
        </Grid>
    </Paper>
    )

    if (props.isAuthenticated && props.user !== null) {
        return <Redirect to="/" />;
    } else {
        return signup
    }



}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        signupError: state.auth.signupError,
        signupErrMessage: state.auth.signupErrMessage
    };
}

export default connect(mapStateToProps)(SignUp)