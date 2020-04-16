import { db } from '../../firebase/firebase'
import store from '../configureStore'

export const SET_USER_DETAILS = 'SET_USER_DETAILS'
export const SET_USER_ADDRESS_ARRAY = 'SET_USER_ADDRESS_ARRAY'

const useruid = JSON.parse(localStorage.getItem('useruid'))

const setUserAddress = (addressArray) => {
    return {
        type: SET_USER_ADDRESS_ARRAY,
        addressArray
    }
}

export const getUserAddresses = () => dispatch => {
    console.log('running', store().getState().auth)

    //change this
    db
        .collection('users')
        .doc(useruid)
        .get()
        .then(snapshot => {
            console.log(snapshot.data())
            dispatch(setUserAddress(snapshot.data().address))
        })
        .catch(err => {
            console.log(err)
        })


}

export const setUserAddresses = address => dispatch => {

}