import {
    SET_USER_DETAILS,
    SET_USER_PROFILE_DETAILS,
    GET_USER_ADDRESSES,
    RECEIVE_USER_ADDRESSES,
    USER_ADDRESSES_ERROR,
    SET_CURRENT_DELIVERY_ADDRESS,
    SET_LOADING_PERCENT,
    SAVED_ORDERS,
    ORDER_SAVE_ERROR
}
    from '../actions/index'

const initialState = {
    userDetails: {
        Name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name..'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true
            }
        },
        Phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Phone Number..'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true,
                isNumber: true
            }
        },
        Street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street..'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true
            }
        },
        PostalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP..'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 3
            }
        },

    },
    addresses: [],
    loading: false,
    refreshAddresses: false,
    currentDeliveryAddress: null,
    profile: null,
    loadingPercent: 0,
    load: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
            }
        case SET_USER_PROFILE_DETAILS: {
            return {
                ...state,
                profile: action.userDetails,
                loading: false
            }
        }

        //ADDRESSES
        case GET_USER_ADDRESSES:
            return {
                ...state,
                loading: true
            }
        case RECEIVE_USER_ADDRESSES: {
            return {
                ...state,
                addresses: action.addressArray,
                loading: false
            }
        }
        case USER_ADDRESSES_ERROR: {
            return {
                ...state,
                loading: false
            }
        }

        case SET_CURRENT_DELIVERY_ADDRESS: {
            return {
                ...state,
                currentDeliveryAddress: action.address,
            }
        }
        //image upload
        case SET_LOADING_PERCENT: {
            return {
                ...state,
                loadingPercent: action.payload.percent,
                load: action.payload.load
            }
        }

        //order save
        case SAVED_ORDERS: {
            return {
                ...state,
                loading: false
            }
        }

        case ORDER_SAVE_ERROR: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state

    }
}

export default reducer