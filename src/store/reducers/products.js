import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    SET_DETAIL_PRODUCT,
    SET_CURRENT_BUY_PRODUCT,
    SET_CART,
    GET_CART_PRODUCTS_SUCCESS
} from '../actions/products'

const initialState = {
    loading: false,
    products: null,
    cart: [],
    localCartProducts: null,
    currentDetailProduct: null,
    currentBuyProduct: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //fetch products
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products
            }

        //SET cart
        case SET_CART:
            return {
                ...state,
                cart: action.cart
            }
        case GET_CART_PRODUCTS_SUCCESS:
            return {
                ...state,
                localCartProducts: action.products
            }

        //GET current details product
        case SET_DETAIL_PRODUCT:
            return {
                ...state,
                currentDetailProduct: action.product
            }

        //GET current buy product
        case SET_CURRENT_BUY_PRODUCT: {
            return {
                ...state,
                currentBuyProduct: action.product
            }
        }

        default:
            return state
    }


}

export default reducer