import { myFirebase } from "../../firebase/firebase"
import { db } from '../../firebase/firebase'

//login
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

//logout
export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

//verify auth
export const VERIFY_REQUEST = "VERIFY_REQUEST"
export const VERIFY_SUCCESS = "VERIFY_SUCCESS"

//signup
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'


const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    }
}

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    }
}

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    }
}

const signUpSuccess = (user) => {
    return {
        type: SIGNUP_SUCCESS,
        user
    }
}
const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST
    }
}
const signUpError = (signupErrMessage) => {
    return {
        type: SIGNUP_ERROR,
        signupErrMessage
    }
}

export const setUserDetails = (user, userDetails) => dispatch => {
    db
        .collection('users')
        .doc(user.user.uid)
        .set(userDetails)
        .then(data => {
            dispatch(signUpSuccess(user))
        })
        .catch(err => {
            dispatch(signUpError())
            console.log('culd not put in db')
        })
}

//async actions for thunk
export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin())
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user))
            localStorage.setItem('useruid', JSON.stringify(user.uid))
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(loginError())
        })
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout())

    myFirebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem('useruid')
            localStorage.removeItem('persist:products')
            dispatch(receiveLogout())
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError())
        })
}

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest())
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(receiveLogin(user))
                localStorage.setItem('useruid', JSON.stringify(user.uid))
            }
            dispatch(verifySuccess())


        })
}

export const signupUser = (email, password, userDetails) => dispatch => {
    dispatch(requestSignup())
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(setUserDetails(user, userDetails))
            localStorage.setItem('useruid', JSON.stringify(user.uid))
        })
        .catch(err => {
            dispatch(signUpError(err.message))
        })
}