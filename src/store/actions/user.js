import { db, firebase1 } from '../../firebase/firebase'
import store from '../configureStore'

export const SET_USER_DETAILS = 'SET_USER_DETAILS'

export const GET_USER_ADDRESSES = 'GET_USER_ADDRESSES'
export const RECEIVE_USER_ADDRESSES = 'RECEIVE_USER_ADDRESSES'
export const USER_ADDRESSES_ERROR = 'USER_ADDRESSES_ERROR'
export const SET_CURRENT_DELIVERY_ADDRESS = 'SET_CURRENT_DELIVERY_ADDRESS'

const useruid = JSON.parse(localStorage.getItem('useruid'))

const getAddresses = () => {
    return {
        type: GET_USER_ADDRESSES
    }
}

const receievUserAddresses = (addressArray) => {
    return {
        type: RECEIVE_USER_ADDRESSES,
        addressArray
    }
}

const userAddressesError = () => {
    return {
        type: USER_ADDRESSES_ERROR
    }
}

export const setCurrentDeliveryAddress = address => {
    return {
        type: SET_CURRENT_DELIVERY_ADDRESS,
        address
    }
}

export const getUserAddresses = () => dispatch => {
    console.log('running', store().getState().auth)
    dispatch(getAddresses())
    //change this
    db
        .collection('users')
        .doc(useruid)
        .get()
        .then(snapshot => {
            console.log(snapshot.data())
            dispatch(receievUserAddresses(snapshot.data().address))
        })
        .catch(err => {
            dispatch(userAddressesError())
        })


}

export const setUserAddresses = address => async (dispatch) => {
    console.log('reacging here')
    let addressesRef = db.collection('users').doc(useruid)
    await addressesRef.update({
        address: firebase1.firestore.FieldValue.arrayUnion(address)
    })
    dispatch(getUserAddresses())

}

