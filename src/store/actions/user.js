import { db, firebase1, storage } from '../../firebase/firebase'
import store from '../configureStore'

export const SET_USER_DETAILS = 'SET_USER_DETAILS'
export const SET_USER_PROFILE_DETAILS = 'SET_USER_PROFILE_DETAILS'

export const GET_USER_ADDRESSES = 'GET_USER_ADDRESSES'
export const RECEIVE_USER_ADDRESSES = 'RECEIVE_USER_ADDRESSES'
export const USER_ADDRESSES_ERROR = 'USER_ADDRESSES_ERROR'
export const SET_CURRENT_DELIVERY_ADDRESS = 'SET_CURRENT_DELIVERY_ADDRESS'

export const SET_LOADING_PERCENT = 'SET_LOADING_PERCENT'

const getUserUid = () => {
    let useruid
    if (store().getState().auth.user.user) {
        useruid = store().getState().auth.user.user.uid
    } else {
        useruid = JSON.parse(localStorage.getItem('useruid'))
    }
    return useruid
}
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

const setUserDetails = userDetails => {
    return {
        type: SET_USER_PROFILE_DETAILS,
        userDetails
    }
}

const setLoadingPercent = (percent, load) => {
    return {
        type: SET_LOADING_PERCENT,
        payload: {
            percent,
            load
        }
    }
}

export const setCurrentDeliveryAddress = address => {
    return {
        type: SET_CURRENT_DELIVERY_ADDRESS,
        address
    }
}


export const getUserAddresses = () => dispatch => {

    dispatch(getAddresses())
    //change this
    db
        .collection('users')
        .doc(getUserUid())
        .get()
        .then(snapshot => {
            console.log('these are addresses ', snapshot.data())
            dispatch(receievUserAddresses(snapshot.data().address))
        })
        .catch(err => {
            dispatch(userAddressesError())
        })


}

export const setUserAddresses = address => async (dispatch) => {
    let addressesRef = db.collection('users').doc(getUserUid())
    await addressesRef.update({
        address: firebase1.firestore.FieldValue.arrayUnion(address)
    })
    dispatch(getUserAddresses())

}

export const removeDeliveryAddress = (addressIndex) => (dispatch, getState) => {
    dispatch(getAddresses())
    let addressArray = [...getState().user.addresses]
    let newAddressArray = addressArray.filter((address, index) => index !== addressIndex)
    db
        .collection('users')
        .doc(getUserUid())
        .update({
            address: newAddressArray
        })
        .then(res => {
            dispatch(getUserAddresses())
        })
        .catch(err => {
            dispatch(userAddressesError())
            console.log('error removing address', err)
        })
}

export const getUserProfileDetails = () => dispatch => {
    dispatch(getAddresses())
    db
        .collection('users')
        .doc(getUserUid())
        .get()
        .then(snapshot => {
            dispatch(setUserDetails(snapshot.data()))
        })
        .catch(err => {
            dispatch(userAddressesError())
        })
}

export const setUserProfileDetails = details => dispatch => {
    dispatch(getAddresses())
    db
        .collection('users')
        .doc(getUserUid())
        .set({
            Name: details.name,
            Phone: details.phone,
            Sex: details.sex,
            Bio: details.bio
        }, {
            merge: true
        })
        .then(snapshot => {
            dispatch(setUserDetails(snapshot.data()))
        })
        .catch(err => {
            dispatch(userAddressesError())
        })

}

export const setImageUpload = (image) => dispatch => {
    const storageRef = storage.ref(`images/${getUserUid()}`)
    const uploadTask = storageRef.put(image)
    uploadTask.on(
        'state_changed',
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('progresss', progress)
            let progressPercent = progress.toFixed(2)
            dispatch(setLoadingPercent(progressPercent, true))
            //use state to track progress
        },
        error => {
            dispatch(setLoadingPercent(0, false))
            console.log('error uploading image')
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                db
                    .collection(`users`)
                    .doc(getUserUid())
                    .set(
                        {
                            url: downloadURL
                        },
                        {
                            merge: true
                        }
                    )
                    .then(() => {
                        dispatch(getUserProfileDetails())
                        console.log(`done saving imge`)
                    })
                    .catch(err => {
                        console.log(`db not updated` + err.message)
                    })
            })

            dispatch(setLoadingPercent(0, false))

        }
    )
}
