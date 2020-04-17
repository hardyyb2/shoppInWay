import {
    SET_USER_DETAILS,
    GET_USER_ADDRESSES,
    RECEIVE_USER_ADDRESSES,
    USER_ADDRESSES_ERROR,
    SET_CURRENT_DELIVERY_ADDRESS
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
    currentDeliveryAddress: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
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
                currentDeliveryAddress: action.address
            }
        }
        default:
            return state

    }
}

export default reducer